import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export const PwaControls = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const updateInstalledState = () => {
      const standaloneMedia = window.matchMedia("(display-mode: standalone)").matches;
      const standaloneNavigator = "standalone" in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
      setIsInstalled(standaloneMedia || standaloneNavigator);
    };

    updateInstalledState();

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setInstallPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("sw.js")
        .then((registration) => {
          if (registration.waiting) {
            setWaitingWorker(registration.waiting);
          }

          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;

            if (!newWorker) {
              return;
            }

            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setWaitingWorker(newWorker);
              }
            });
          });
        })
        .catch(() => undefined);

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const handleUpdate = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setWaitingWorker(null);
  };

  if (waitingWorker) {
    return (
      <button type="button" onClick={handleUpdate} className="install-app-button">
        Actualizar app
      </button>
    );
  }

  if (!isInstalled && installPrompt) {
    return (
      <button type="button" onClick={handleInstall} className="install-app-button">
        Instalar app
      </button>
    );
  }

  return null;
};
