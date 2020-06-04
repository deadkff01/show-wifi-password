import execa from 'execa';
import { generateQrCode } from '../utils/qrcodeGenerator';

const command = 'netsh';

const splitPassword = (password: string): string =>
  password?.split(':')[1]?.trim();

async function getWifiPassword(ssid: string): Promise<void> {
  try {
    const args = ['wlan', 'show', 'profile', `name=${ssid}`, 'key=clear'];
    const { stdout } = await execa(command, args);
    const getContentKey = /^\s*Key Content\s*: (.+)\s*$/gm
      .exec(stdout)
      ?.toString();
    // if windows is not in english
    const passwordString =
      getContentKey ?? `Password: ${splitPassword(stdout.split('\n')[32])}`;
    console.log(passwordString);
    generateQrCode(`WIFI:T:WPA;S:${ssid};P:${splitPassword(passwordString)};`);
  } catch (e) {
    console.log(e);
  }
}

export default async function wifiInfoWindows(): Promise<void> {
  try {
    const args = ['wlan', 'show', 'interface'];
    const { stdout } = await execa(command, args);
    const ssid = /^\s*SSID\s*: (.+)\s*$/gm.exec(stdout)?.[1];
    console.log(`WIFI SSID: ${ssid}`);
    if (ssid) getWifiPassword(ssid);
  } catch (e) {
    console.log(e);
  }
}
