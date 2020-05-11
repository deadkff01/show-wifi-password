import execa from 'execa';

const command = 'netsh';

async function getWifiPassword(ssid: any) {
  const args = ['wlan', 'show', 'profile', `name=${ssid}`, 'key=clear'];
  try {
    const { stdout } = await execa(command, args);
    const getContentKey = /^\s*Key Content\s*: (.+)\s*$/gm.exec(stdout);
    // if windows is not in english
    if (getContentKey === null) {
      const keyByIndex = stdout.split('\n')[32];
      console.log(`Password: ${keyByIndex?.split(':')[1].trim()}`);
      return;
    }
    console.log(getContentKey);
  } catch (e) {
    console.log(e);
  }
}

export default async function wifiInfoWindows() {
  const args = ['wlan', 'show', 'interface'];
  try {
    const { stdout } = await execa(command, args);
    const ssid = /^\s*SSID\s*: (.+)\s*$/gm.exec(stdout);
    console.log(`WIFI SSID: ${ssid?.[1]}`);
    getWifiPassword(ssid?.[1]);
  } catch (e) {
    console.log(e);
  }
}
