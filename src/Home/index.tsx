import { useEffect, useState } from "react";
import { View } from "react-native";
import { Camera, CameraType, FaceDetectionResult } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as ImagePicker from "expo-image-picker";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { styles } from "./styles";

export function Home({
  ativarImgProps,
  adicionarImgPropsActiveNeutro,
  setAddImgPropsNeutro,
}: any) {
  const [faceDetectad, setFaceDetectad] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(
    "https://cdn.icon-icons.com/icons2/564/PNG/512/Add_Image_icon-icons.com_54218.png"
  );

  const handleImagePickerNeutro = async () => {
    const resultNeutro = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 4],
      allowsEditing: true,
      base64: true,
      quality: 1,
    });
    if (!resultNeutro.canceled) {
      setImage(resultNeutro.assets[0].uri);
    }
  };

  if (adicionarImgPropsActiveNeutro) {
    handleImagePickerNeutro();
    setAddImgPropsNeutro(false);
  }

  const faceValues = useSharedValue({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  function handleFacesDetected({ faces }: FaceDetectionResult) {
    const face = faces[0] as any;

    if (face) {
      const { size, origin } = face.bounds;

      faceValues.value = {
        width: size.width,
        height: size.height,
        x: origin.x,
        y: origin.y,
      };

      setFaceDetectad(true);

      if (ativarImgProps) {
        if (face.smilingProbability > 0.5) {
          setImage(image);
        } else if (
          face.leftEyeOpenProbability > 0.5 &&
          face.rightEyeOpenProbability < 0.5
        ) {
          setImage(image);
        } else {
          setImage(image);
        }
      } else {
        setFaceDetectad(false);
      }
    }
  }

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: 1,
    width: faceValues.value.width,
    height: faceValues.value.height,
    transform: [
      { translateX: faceValues.value.x },
      { translateY: faceValues.value.y },
    ],
    borderRadius: 100,
  }));

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission?.granted) {
    return;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={CameraType.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
      {faceDetectad && (
        <Animated.Image style={animatedStyle} source={{ uri: image }} />
      )}
    </View>
  );
}
