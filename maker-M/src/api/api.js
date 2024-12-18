import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIpUdHpSEk8ahMIO59T-BAx7n5_BcRYW4",
    authDomain: "printer-aid.firebaseapp.com",
    databaseURL: "https://printer-aid-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "printer-aid",
    storageBucket: "printer-aid.firebasestorage.app",
    messagingSenderId: "636113573034",
    appId: "1:636113573034:web:ece0d1f5733050f432acd3",
    measurementId: "G-C8D4N5PT0S"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addUniqueItem = async (item) => {
  const itemsRef = collection(db, "items");

  // Controleer op duplicaten
  const q = query(itemsRef, where("uniqueId", "==", item.uniqueId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    console.error("Item al geregistreerd");
    return { success: false, message: "Item bestaat al!" };
  }

  // Voeg nieuw item toe
  try {
    await addDoc(itemsRef, item);
    return { success: true, message: "Item toegevoegd!" };
  } catch (error) {
    console.error("Fout bij toevoegen item:", error);
    return { success: false, message: "Fout bij toevoegen item." };
  }
};
