import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

 export const SettingItem = ({ 
    icon, 
    title, 
    value, 
    onPress, 
    isSwitch = false,
    switchValue = false,
    onSwitchChange = () => {}
  }: {
    icon: string;
    title: string;
    value: string;
    onPress: () => void;
    isSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.white}
          onValueChange={onSwitchChange}
          value={switchValue}
        />
      ) : (
        <View style={styles.settingRight}>
          <Text style={styles.settingValue}>{value}</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
        </View>
      )}
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
    settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.text.primary,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 8,
  },
});
    
        