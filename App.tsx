import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string | null>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    setBarcode(data);
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['ean8', 'ean13'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {barcode && (
        <View style={styles.barcodeContainer}>
          <Text style={styles.barcodeText}>Scanned Barcode:</Text>
          <Text style={styles.barcodeNumber}>{barcode}</Text>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  barcodeContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
  },
  barcodeText: {
    fontSize: 18,
    marginBottom: 10,
  },
  barcodeNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
