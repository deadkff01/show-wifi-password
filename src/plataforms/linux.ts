import execa from 'execa';
import { genetateQrCode } from '../utils/qrcodeGenerator';

async function getWifiPassword(ssid: string): Promise<void> {
  try {
    const command = 'sudo';
    const args = [
      'cat',
      `/etc/NetworkManager/system-connections/${ssid}.nmconnection`,
    ];
    const { stdout } = await execa(command, args);
    const password = /^\s*(?:psk|password)=(.+)\s*$/gm.exec(stdout)?.[1];
    console.log(`Password: ${password}`);
    genetateQrCode(`WIFI:T:WPA;S:${ssid};P:${password};`);
  } catch (e) {
    console.log(e);
  }
}

export default async function wifiInfoLinux(): Promise<void> {
  try {
    const command = 'iwgetid';
    const args = ['--raw'];
    const { stdout } = await execa(command, args);
    console.log(`WIFI SSID: ${stdout}`);
    getWifiPassword(stdout);
  } catch (e) {
    console.log(e);
    console.log('cannot get SSID');
  }
}
