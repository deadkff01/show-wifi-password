/**
 * show-wifi-password
 * @author deadkff01
 */

import wifiInfoWindows from './plataforms/windows';
import wifiInfoLinux from './plataforms/linux';

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
