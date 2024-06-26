import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Dimensions, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp, DrawerActions } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import UserService from '../../services/UserService/UserService';
import { User } from '../../types/types';
import { StackTypes } from '../../routes/stack';


type RootStackParamList = {
    Home: { username: string };
    CriarGrupo: undefined;
    Perfil: undefined;
};
type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'Home'>;

const Perfil = () => {
    const [perfil, setPerfil] = useState<User>({ nome: '', email: '', senha: '', foto: '' });
    const navigation = useNavigation<StackTypes>();
    const userService = new UserService();
  
    const handleSalvarPerfil = async () => {
      try {
        const result = await userService.updatePerfil(perfil);
        if (result.success) {
          Alert.alert('Perfil Atualizado', 'Suas informações foram atualizadas com sucesso.');
        } else {
          Alert.alert('Erro', result.message || 'Ocorreu um erro ao atualizar o perfil.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível atualizar o perfil. Tente novamente mais tarde.');
      }
    };

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color='#F5CBA7' />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Olá</Text>
                    <TouchableOpacity onPress={() => {}}>
                    <MaterialIcons name="notifications" size={24} color='#F5CBA7'/>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Perfil</Text>
                </View>
            <View style={styles.profileContainer}>
                <View style={styles.imageUploadContainer}>
                    <Image source={require('../../../assets/Grupo.png')} style={styles.profileImage} />
                    <TouchableOpacity style={styles.editImageButton}>
                        <Text style={styles.editImageButtonText}>Editar Imagem</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput style={styles.input} placeholder="" />
                    <Text style={styles.label}>Nome Completo:</Text>
                    <TextInput style={styles.input} placeholder="" />
                    <Text style={styles.label}>Email:</Text>
                    <TextInput style={styles.input} placeholder="" />
                    <Text style={styles.label}>Senha:</Text>
                    <TextInput style={styles.input} placeholder="" secureTextEntry />
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5CBA7',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#784212',
    },
    titleContainer: {
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
    imageUploadContainer: {
        width:'100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
    },
    headerText: {
        color: '#F5CBA7',
        fontWeight: 'bold',
        fontSize: 18,
    },
    notificationButton: {
        padding: 10,
    },
    profileContainer: {
        width:'100%',
        backgroundColor: '#F5CBA7',
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent:'center',
        alignContent:'center'
    },
    form: {
        width: '80%',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    label: {
        width: '100%',
        fontSize: 16,
        color: '#784212',
        marginBottom: 5,
        justifyContent:'center',
    },
    labelContainer: {
        width: '80%',
        fontSize: 16,
        color: '#784212',
        marginBottom: 5,
        justifyContent: 'center'
    },
    editImageButton: {
        width: '40%',
        height: 40,
        borderRadius: 10,
        backgroundColor: '#784212', 
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: 20,
        marginBottom: 10
    },
    editImageButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#784212',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    saveButton: {
        width: '100%',
        backgroundColor: '#784212',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default Perfil;
