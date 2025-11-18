import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ title, onPress }: { title: string, onPress?: () => void }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name="list-outline" size={20} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      },
      title: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text.primary,
      },
      filterText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: '500',
      },
});