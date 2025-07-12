import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  public get electron(): any {
    if (window && (window as any).electronAPI) {
      return (window as any).electronAPI;
    }
    return null;
  }

  /**
   * determines if SPA is running in Electron
   */
  public get isElectronApp(): boolean {
    return !!window.navigator.userAgent.match(/Electron/);
  }

  public get isMacOS(): boolean {
    return this.isElectronApp && this.electron.platform === 'darwin';
  }

  public get isWindows(): boolean {
    return this.isElectronApp && this.electron.platform === 'win32';
  }

  public get isLinux(): boolean {
    return this.isElectronApp && this.electron.platform === 'linux';
  }

  public get isX86(): boolean {
    return this.isElectronApp && this.electron.arch === 'ia32';
  }

  public get isX64(): boolean {
    return this.isElectronApp && this.electron.arch === 'x64';
  }

  public get isArm(): boolean {
    return this.isElectronApp && this.electron.arch === 'arm';
  }

  public get isArm64(): boolean {
    return this.isElectronApp && this.electron.arch === 'arm64';
  }

  public get isWeb(): boolean {
    return !this.isElectronApp;
  }

  public get getSettings(): () => Promise<any> {
    return this.electron.getSettings;
  }

  public get getSnackBarSettings(): () => Promise<any> {
    return this.electron.getSnackBarSettings;
  }
}
