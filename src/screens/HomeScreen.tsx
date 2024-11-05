import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, StatusBar  } from 'react-native';
import { FAB, Appbar, useTheme, Snackbar, ActivityIndicator  } from 'react-native-paper';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentForm from '../components/AppointmentForm';
import { Appointment } from '../models/Appointment';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from '../services/appointmentSerice';

const HomeScreen = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isloading, setIsloading] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    fetchAppointments();
  }, []);
  
  

  const handleAddPress = () => {
    setSelectedAppointment(null);
    setIsFormVisible(true);
  };

  const handleEditPress = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsFormVisible(true);
  };
  
  const fetchAppointments = async () => {
    try {
      setIsloading(true);
      const appointmentsData: Appointment[]  = await getAppointments();
      if(appointmentsData.length > 0)
        setAppointments(appointmentsData);
      else{
        setAppointments([]);
      }
    } catch (error) {
      setSnackbarMessage('Erro ao obter agendamentos: ' + error);
      setSnackbarVisible(true);
    }finally{
      setIsloading(false);
    }
  };

  const handleSave = async (appointment: Appointment) => {
    try {
      setIsloading(true);
      if (appointment.id) {
        await updateAppointment(appointment);
      } else {
        await createAppointment(appointment);
      }
      setIsFormVisible(false);
      await fetchAppointments();
    } catch (error) {
      setSnackbarMessage('Erro ao salvar agendamento: ' + error);
      setSnackbarVisible(true);
    } finally{
      setIsloading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
      await fetchAppointments();
    } catch (error) {
      setSnackbarMessage('Erro ao deletar agendamento: ' + error);
      setSnackbarVisible(true);
    }
  };

  return (
    <>
      <StatusBar
          barStyle={"light-content"}
          backgroundColor={theme.colors.surface}
        />
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
          <Appbar.Header >
            <Appbar.Content title="Barbearia do Daniel" titleStyle={{ color: theme.colors.onPrimary }}/>
          </Appbar.Header>
          {appointments.length > 0 ? 
            <View style={[styles.content, styles.container,{ backgroundColor: theme.colors.background }]}> 
              {isloading ?
                <ActivityIndicator size="large" color={theme.colors.primary} />
              :
                <FlatList
                  showsVerticalScrollIndicator={true}
                  data={appointments}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => (
                    <AppointmentCard
                        appointment={item}
                        onEditPress={handleEditPress}
                        onDeletePress={handleDelete}
                    />
                  )}
                />
              }
            </View> : 
            <View style={[styles.view, styles.content, { backgroundColor: theme.colors.background }]}> 
                <Text>Não há registros para ser exibidos...</Text>
            </View>
          }
          <FAB style={[styles.fab, { backgroundColor: theme.colors.primary }]} icon="plus" onPress={handleAddPress} />
          <AppointmentForm
              visible={isFormVisible}
              onDismiss={() => setIsFormVisible(false)}
              onSave={handleSave}
              appointment={selectedAppointment}
          />
      </SafeAreaView>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  fab: { position: 'absolute', right: 16, bottom: 16},
  view: {flex: 1, justifyContent: 'center', alignItems:'center'},
  content: {borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingTop: 10, paddingBottom: 10},
});

export default HomeScreen;
