import { db } from '../config/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { Appointment } from '../models/Appointment';

const appointmentsCollection = collection(db, 'appointments');

export const createAppointment = async (appointment: Appointment) => {
    try {
      const { id, ...appointmentData } = appointment;
      const docRef = await addDoc(appointmentsCollection, appointmentData);
      return { ...appointment, id: docRef.id };
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      throw error;
    }
  };

  export const getAppointments = async (): Promise<Appointment[]> => {
    try {
      const querySnapshot = await getDocs(appointmentsCollection);
      const appointments: Appointment[] = [];
      querySnapshot.forEach((doc) => {
        appointments.push({ id: doc.id, ...doc.data() } as Appointment);
      });
      return appointments;
    } catch (error) {
      console.error('Erro ao obter agendamentos:', error);
      throw error;
    }
  };

  export const updateAppointment = async (appointment: Appointment) => {
    try {
      const appointmentDoc = doc(db, 'appointments', appointment.id as string);
      await updateDoc(appointmentDoc, {
        clientName: appointment.clientName,
        phoneNumber: appointment.phoneNumber,
        appointmentDate: appointment.appointmentDate,
        haircutType: appointment.haircutType,
      });
      return appointment;
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      throw error;
    }
  };
  
  export const deleteAppointment = async (id: string) => {
    try {
      const appointmentDoc = doc(db, 'appointments', id);
      await deleteDoc(appointmentDoc);
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      throw error;
    }
  };
  
  
  