/**
 * show-wifi-password
 * @author deadkff01
 */

import wifiInfoWindows from './plataforms/windows';

interface ObjLiteral {
  [key: string]: () => void;
}

const showWifiPassword: ObjLiteral = {
  win32: () => wifiInfoWindows(),
  // TODO: linux and osx
};

console.log('###### show-wifi-password ######');

showWifiPassword[process.platform]();
