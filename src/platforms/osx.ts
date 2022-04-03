import execa from 'execa';
import { generateQrCode } from '../utils/qrcodeGenerator';

async function getWifiPassword(ssid: string): Promise<void> {
  try {
    const command = 'security';
    const args = [
      'find-generic-password',
      '-D',
      'AirPort network password',
      '-wa',
      ssid,
    ];

    const { stdout } = await execa(command, args);
    const password = /^\s*(?:psk|password)=(.+)\s*$/gm.exec(stdout)?.[1];
    // console.log(`Password: ${stdout}`);
    await generateQrCode(`WIFI:T:WPA;S:${ssid};P:${password};`);
  } catch (e) {
    console.log(e);
  }
}

export default async function wifiInfoOSX(): Promise<void> {
  try {
    const command =
      '/System/Library/PrivateFrameworks/Apple80211.framework/Resources/airport';
    const args = ['-I'];
    const { stdout } = await execa(command, args);
    const ssid = /^\s*SSID\s*: (.+)\s*$/gm.exec(stdout)?.[1];
    console.log(`WIFI SSID: ${ssid}`);
    if (ssid) await getWifiPassword(ssid);
  } catch (e) {
    console.log(e);
  }
}
