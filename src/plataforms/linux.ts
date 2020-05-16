import execa from 'execa';

async function getWifiPassword(ssid: string): Promise<void> {
  try {
    const command = 'sudo';
    const args = [
      'cat',
      `/etc/NetworkManager/system-connections/${ssid}.nmconnection`,
    ];
    const { stdout } = await execa(command, args);
    const password = /^\s*(?:psk|password)=(.+)\s*$/gm.exec(stdout);
    console.log(`Password: ${password?.[1]}`);
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
