/**
 * show-wifi-password
 * @author deadkff01
 */

import wifiInfoWindows from './platforms/windows';
import wifiInfoLinux from './platforms/linux';
import wifiInfoOSX from './platforms/osx';

interface ObjLiteral {
  [key: string]: () => void;
}

const showWifiPassword: ObjLiteral = {
  win32: () => wifiInfoWindows(),
  linux: () => wifiInfoLinux(),
  darwin: () => wifiInfoOSX()
};

console.log('###### show-wifi-password ######');

console.log(process.platform)

showWifiPassword[process.platform]();
