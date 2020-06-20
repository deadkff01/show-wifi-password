/**
 * show-wifi-password
 * @author deadkff01
 */

import wifiInfoWindows from './platforms/windows';
import wifiInfoLinux from './platforms/linux';

interface ObjLiteral {
  [key: string]: () => void;
}

const showWifiPassword: ObjLiteral = {
  win32: () => wifiInfoWindows(),
  linux: () => wifiInfoLinux(),
  // TODO: osx
};

console.log('###### show-wifi-password ######');

showWifiPassword[process.platform]();
