import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { Avatar } from '../components/Avatar';
import { SettingItem } from '../components/SettingsRow';
import { Button } from '../components/Button';
import { useLanguage } from '../hooks/useLang';

const SettingsScreen = () => {
  const { currentLanguage, changeLanguage, t } = useLanguage();
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'JD',
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },

  ];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    changeLanguage(languageCode as any);
  };

  const getCurrentLanguageName = () => {
    const lang = languages.find(lang => lang.code === currentLanguage);
    return lang ? lang.name : 'English';
  };

  const toggleLanguageModal = () => {
    setLanguageModalVisible(!isLanguageModalVisible);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Avatar name={user.name} email={user.email} avatar={user.avatar} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.accountSettings')}</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="person-outline"
              title={t('settings.editProfile')}
              value=""
              onPress={() => {}}
            />
            <SettingItem
              icon="lock-closed-outline"
              title={t('settings.changePassword')}
              value=""
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.appSettings')}</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="language-outline"
              title={t('settings.language')}
              value={getCurrentLanguageName()}
              onPress={toggleLanguageModal}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings.support')}</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon="help-circle-outline"
              title={t('settings.support')}
              value=""
              onPress={() => {}}
            />
            <SettingItem
              icon="document-text-outline"
              title={t('settings.termsConditions')}
              value=""
              onPress={() => {}}
            />
            <SettingItem
              icon="shield-checkmark-outline"
              title={t('settings.privacyPolicy')}
              value=""
              onPress={() => {}}
            />
          </View>
        </View>

        <Button title={t('settings.logout')} onPress={() => {}} />

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
        </View>

        <Modal
          visible={isLanguageModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={toggleLanguageModal}>
          <TouchableWithoutFeedback onPress={toggleLanguageModal}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('settings.selectLanguage')}</Text>
              <TouchableOpacity onPress={toggleLanguageModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => handleLanguageChange(itemValue)}
              style={styles.picker}>
              {languages.map((lang) => (
                <Picker.Item 
                  key={lang.code} 
                  label={lang.name} 
                  value={lang.code} 
                />
              ))}
            </Picker>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  closeButton: {
    padding: 5,
  },
  picker: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 32,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
    padding: 16,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
  sectionContent: {
    paddingHorizontal: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '600',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  logoutButton: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  logoutButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    padding: 16,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});

export default SettingsScreen;