import QRCode from 'qrcode';

export const generateQrCode = async (code: string): Promise<void> => {
  try {
    const qrcodeValue = await QRCode.toString(code, {
      type: 'terminal',
    });
    console.log(qrcodeValue);
  } catch (e) {
    console.log(e);
  }
};
