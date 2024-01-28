export {}

declare global {
  interface Window {
    minecraftClosed: () => void
    minecraftLoad: () => void
    minecraftRunning: () => void
    minecraftInstalled: () => void
    minecraftInstalling: (version: string) => void
    minecraftInstallStatus: (status: string) => void
    minecraftInstallProgress: (progress: number) => void
  }
}