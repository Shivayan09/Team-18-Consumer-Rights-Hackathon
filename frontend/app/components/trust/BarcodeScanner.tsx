import { useEffect, useRef, useState } from "react";
import { X, Camera, RefreshCw, ShieldAlert, WifiOff, Barcode, ZoomIn } from "lucide-react";
import {
  MultiFormatReader,
  HTMLCanvasElementLuminanceSource,
  BinaryBitmap,
  HybridBinarizer,
  DecodeHintType,
  BarcodeFormat,
  NotFoundException,
} from "@zxing/library";

interface BarcodeScannerProps {
  onDetected: (value: string) => void;
  onClose: () => void;
}

type CameraError =
  | { kind: "denied" }
  | { kind: "no-camera" }
  | { kind: "insecure" }
  | { kind: "unknown"; message: string };

function detectError(err: unknown): CameraError {
  if (!window.isSecureContext) return { kind: "insecure" };
  if (!navigator.mediaDevices?.getUserMedia) return { kind: "no-camera" };
  if (err instanceof DOMException) {
    if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") return { kind: "denied" };
    if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") return { kind: "no-camera" };
    if (err.name === "NotReadableError" || err.name === "TrackStartError") return { kind: "unknown", message: "Camera is in use by another app." };
  }
  return { kind: "unknown", message: "Could not start camera." };
}

function permissionInstructions(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad/.test(ua)) return "Go to Settings → Safari → Camera → Allow.";
  if (/Android/.test(ua) && /Chrome/.test(ua)) return "Tap the lock icon in the address bar → Permissions → Camera → Allow.";
  if (/Android/.test(ua)) return "Go to Settings → Apps → Browser → Permissions → Camera → Allow.";
  if (/Chrome/.test(ua)) return "Click the camera icon in the address bar and choose 'Allow'.";
  if (/Firefox/.test(ua)) return "Click the camera blocked icon in the address bar → Allow.";
  return "Check your browser's address bar for a camera permission icon and allow access.";
}

function buildReader(): MultiFormatReader {
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.ITF,
    BarcodeFormat.CODABAR,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.DATA_MATRIX,
  ]);
  hints.set(DecodeHintType.TRY_HARDER, true);
  const reader = new MultiFormatReader();
  reader.setHints(hints);
  return reader;
}

export default function BarcodeScanner({ onDetected, onClose }: BarcodeScannerProps) {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const streamRef   = useRef<MediaStream | null>(null);
  const rafRef      = useRef<number>(0);
  const readerRef   = useRef<MultiFormatReader>(buildReader());
  const detectedRef = useRef(false);

  const [cameraError, setCameraError]         = useState<CameraError | null>(null);
  const [scanning, setScanning]               = useState(false);
  const [torchOn, setTorchOn]                 = useState(false);
  const [torchAvailable, setTorchAvailable]   = useState(false);

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, []);

  async function startCamera() {
    setCameraError(null);
    setScanning(false);
    detectedRef.current = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width:  { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      streamRef.current = stream;

      const track = stream.getVideoTracks()[0];
      const caps = track.getCapabilities() as any;
      if (caps?.torch) setTorchAvailable(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current!.play();
          setScanning(true);
          scheduleFrame();
        };
      }
    } catch (err) {
      setCameraError(detectError(err));
    }
  }

  function stopCamera() {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  }

  async function toggleTorch() {
    const track = streamRef.current?.getVideoTracks()[0];
    if (!track) return;
    const next = !torchOn;
    try {
      await (track as any).applyConstraints({ advanced: [{ torch: next }] });
      setTorchOn(next);
    } catch { /* not supported */ }
  }

  function scheduleFrame() {
    rafRef.current = requestAnimationFrame(scanFrame);
  }

  function scanFrame() {
    if (detectedRef.current) return;

    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < video.HAVE_ENOUGH_DATA) {
      scheduleFrame();
      return;
    }

    const w = video.videoWidth;
    const h = video.videoHeight;
    canvas.width  = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) { scheduleFrame(); return; }

    ctx.drawImage(video, 0, 0, w, h);

    try {
      const luminance = new HTMLCanvasElementLuminanceSource(canvas);
      const bitmap    = new BinaryBitmap(new HybridBinarizer(luminance));
      const result    = readerRef.current.decode(bitmap);
      if (result) {
        detectedRef.current = true;
        stopCamera();
        onDetected(result.getText());
        return;
      }
    } catch (e) {
      if (!(e instanceof NotFoundException)) {
        console.warn("Barcode decode error:", e);
      }
    }

    scheduleFrame();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <Barcode className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">Scan Barcode</span>
          </div>
          <div className="flex items-center gap-2">
            {torchAvailable && (
              <button
                onClick={toggleTorch}
                title="Toggle torch"
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors text-sm ${
                  torchOn ? "bg-amber-500/20 text-amber-400" : "bg-slate-800 hover:bg-slate-700 text-slate-400"
                }`}
              >
                🔦
              </button>
            )}
            <button
              onClick={() => { stopCamera(); onClose(); }}
              className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Camera view */}
        <div className="relative bg-black" style={{ aspectRatio: "4/3" }}>
          {cameraError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center bg-slate-950">
              {cameraError.kind === "insecure" && <>
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <WifiOff className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">HTTPS required</p>
                  <p className="text-xs text-slate-400 leading-relaxed">Camera only works on secure (HTTPS) pages.</p>
                </div>
              </>}
              {cameraError.kind === "no-camera" && <>
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center">
                  <Camera className="w-7 h-7 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">No camera found</p>
                  <p className="text-xs text-slate-400">We couldn't find a camera on your device.</p>
                </div>
              </>}
              {cameraError.kind === "denied" && <>
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                  <ShieldAlert className="w-7 h-7 text-red-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Camera access blocked</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{permissionInstructions()}</p>
                  <p className="text-xs text-slate-600">Then tap Retry below.</p>
                </div>
                <button onClick={startCamera}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all">
                  <RefreshCw className="w-3.5 h-3.5" /> Retry
                </button>
              </>}
              {cameraError.kind === "unknown" && <>
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center">
                  <Camera className="w-7 h-7 text-slate-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">Camera unavailable</p>
                  <p className="text-xs text-slate-400">{cameraError.message}</p>
                </div>
                <button onClick={startCamera}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all">
                  <RefreshCw className="w-3.5 h-3.5" /> Try again
                </button>
              </>}
            </div>
          ) : (
            <>
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              <canvas ref={canvasRef} className="hidden" />

              {scanning && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute inset-x-0 top-0    h-[28%] bg-black/55" />
                  <div className="absolute inset-x-0 bottom-0 h-[28%] bg-black/55" />
                  <div className="relative w-[84%] h-20">
                    <div className="absolute top-0    left-0  w-5 h-5 border-t-2 border-l-2 border-blue-400 rounded-tl" />
                    <div className="absolute top-0    right-0 w-5 h-5 border-t-2 border-r-2 border-blue-400 rounded-tr" />
                    <div className="absolute bottom-0 left-0  w-5 h-5 border-b-2 border-l-2 border-blue-400 rounded-bl" />
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-400 rounded-br" />
                    <div className="absolute inset-x-3 h-px bg-linear-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_2px_rgba(96,165,250,0.6)] animate-[barcodescan_1.6s_ease-in-out_infinite]" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 flex items-center justify-between">
          <p className="text-xs text-slate-500">EAN-13 · Code128 · UPC · QR & more</p>
          <div className="flex items-center gap-1 text-xs text-slate-600">
            <ZoomIn className="w-3 h-3" />
            <span>Hold steady, good light</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes barcodescan {
          0%, 100% { transform: translateY(-28px); opacity: 0.4; }
          50%       { transform: translateY(28px);  opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
