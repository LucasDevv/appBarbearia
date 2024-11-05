import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Modal, Portal, TextInput, Button, IconButton, useTheme, Text, Snackbar } from 'react-native-paper';
import { Appointment } from '../models/Appointment';
import MaskInput, { Masks } from 'react-native-mask-input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSave: (appointment: Appointment) => void;
  appointment: Appointment | null;
}

const AppointmentForm: React.FC<Props> = ({ visible, onDismiss, onSave, appointment }) => {
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [haircutType, setHaircutType] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme = useTheme();

  useEffect(() => {
    if (visible) {
      if (appointment) {
        setClientName(appointment.clientName);
        setPhoneNumber(appointment.phoneNumber);
        setAppointmentDate(appointment.appointmentDate);
        setHaircutType(appointment.haircutType);
      } else {
        setClientName('');
        setPhoneNumber('');
        setAppointmentDate('');
        setHaircutType('');
      }
    }
  }, [appointment, visible]);

  const handleSave = async () => {
    if (!clientName || !phoneNumber || !appointmentDate || !haircutType) {
      setSnackbarMessage('Preencha todos os campos.');
      setSnackbarVisible(true);
      return;
    }

    const newAppointment: Appointment = {
      id: appointment ? appointment.id : "",
      clientName,
      phoneNumber,
      appointmentDate,
      haircutType,
    };
    onSave(newAppointment);
    onDismiss();
  };

  // Funções para o Date Picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date: Date) => {
    // Formatar a data como DD/MM/AAAA
    const formattedDate = date.toLocaleDateString('pt-BR');
    setAppointmentDate(formattedDate);
    hideDatePicker();
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.background }]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <View style={styles.header}>
                <Text style={styles.title}>Novo Cliente</Text>
                <IconButton icon="close" onPress={onDismiss} style={styles.closeButton} />
              </View>
              <TextInput
                mode="outlined"
                label="Nome do Cliente"
                value={clientName}
                onChangeText={setClientName}
                style={styles.input}
              />
              <TextInput
                mode="outlined"
                label="Número de Telefone"
                value={phoneNumber}
                render={props => (
                    <MaskInput
                        {...props}
                        value={phoneNumber}
                        onChangeText={(masked) => {
                        setPhoneNumber(masked); // Você pode optar por armazenar o valor mascarado ou não
                        }}
                        mask={Masks.BRL_PHONE}
                    />
                )}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                style={styles.input}
              />
              <TextInput
                readOnly={true}
                mode="outlined"
                label="Data do Agendamento"
                value={appointmentDate}
                onTouchStart={showDatePicker}
                style={styles.input}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
                locale="pt-BR"
              />
              <TextInput
                mode="outlined"
                label="Tipo de Corte"
                value={haircutType}
                onChangeText={setHaircutType}
                style={styles.input}
              />
              <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
                Salvar
              </Button>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 8 },
  closeButton: { alignSelf: 'flex-end' },
  input: { marginBottom: 10 },
  saveButton: { marginTop: 20 , borderRadius: 8},
  header: {flexDirection: 'row', alignItems:'center', justifyContent: 'space-between'},
  title: {fontSize: 18}
});

export default AppointmentForm;
