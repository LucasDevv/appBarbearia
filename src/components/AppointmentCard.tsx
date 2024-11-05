import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';
import { Appointment } from '../models/Appointment';

interface Props {
  appointment: Appointment;
  onEditPress: (appointment: Appointment) => void;
  onDeletePress: (id: string) => void;
}

const AppointmentCard: React.FC<Props> = ({ appointment, onEditPress, onDeletePress }) => {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Title
        title={appointment.clientName}
        titleStyle={{color: theme.colors.onPrimary}}
        right={(props) => (
          <View style={styles.actionIcons}>
            <IconButton iconColor={theme.colors.primary} {...props} icon="pencil" onPress={() => onEditPress(appointment)} />
            <IconButton iconColor={theme.colors.primary} {...props} icon="delete" onPress={() => onDeletePress(appointment.id)} />
          </View>
        )}
      />
      <Card.Content>
        <Text style={{ color: theme.colors.onPrimary}}>Telefone: {appointment.phoneNumber}</Text>
        <Text style={{ color: theme.colors.onPrimary}}>Data: {appointment.appointmentDate}</Text>
        <Text style={{ color: theme.colors.onPrimary}}>Tipo de Corte: {appointment.haircutType}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { margin: 8, marginLeft: 18, marginRight: 18 },
  actionIcons: { flexDirection: 'row' },
});

export default AppointmentCard;
