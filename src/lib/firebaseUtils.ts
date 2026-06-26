import { ref, set, get, update, remove, onValue } from "firebase/database";
import { db } from "./firebase";

const machineRef = ref(db, "machine_data");

export const createMachineData = async () => {
  try {
    await set(machineRef, {
      PF: 0.75,
      THD: 15,
      current: 3,
      vib: 0,
      voltage: 220,
    });
    console.log("Data initialized successfully!");
  } catch (error) {
    console.error("Error creating data:", error);
  }
};

export const getMachineDataOnce = async () => {
  try {
    const snapshot = await get(machineRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error reading data:", error);
  }
};

export const subscribeToMachineData = (callback: (arg0: any) => void) => {
  return onValue(machineRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const updateMachineMetrics = async (newCurrent: any, newVib: any) => {
  try {
    await update(machineRef, {
      current: newCurrent,
      vib: newVib
    });
    console.log("Metrics updated!");
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

export const deleteMachineData = async () => {
  try {
    await remove(machineRef);
    console.log("Machine data deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
};