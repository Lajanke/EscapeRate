import React from 'react';
import { StyleSheet, Button, TextInput, View, Text,} from 'react-native';
import { Formik } from 'formik';
import { useLinkProps } from '@react-navigation/native';
import { Room } from './HomeScreen';

export interface AddRoomFormProps {
    setRoomList: React.Dispatch<React.SetStateAction<Room[]>>; 
    roomList: Room[];
}

const AddRoomForm: React.FC<AddRoomFormProps> = (props) => {
    const addRoom = (values) => {
        const maxId: number = props.roomList.reduce((max: number, room: Room) => room.id > max ? room.id : max, 0);
        const newRoom: Room = {
            id: maxId + 1,
            name: values.name,
            escaped: false,
            groupSize: values.groupSize,
            time: 47,
            company: 'Scape',
            companyURL: 'https://lajanke.github.io/Portfolio/',
            image: 'https://lajanke.github.io/Portfolio/images/avatarMe.png',
        };
        props.setRoomList([...props.roomList, newRoom]);
    }

    return <View>
        <Formik
            initialValues={{
                name: '',
                escaped: false,
                time: 54,
                groupSize: '',
                image: '',
                company: '',
                companyURL: '',
            }}
            onSubmit={(values) => {
                addRoom(values)
               // console.log(values)
            }}
        >
            {(formikProps) => (
                <View>
                    <TextInput placeholder='Room name' 
                    onChangeText={formikProps.handleChange('name')}
                    value={formikProps.values.name}
                    />
                    <TextInput placeholder='Group Size' 
                    onChangeText={formikProps.handleChange('groupSize')}
                    value={formikProps.values.groupSize}
                    keyboardType={"numeric"}
                    />
                    <Button title='submit' onPress={formikProps.handleSubmit} />
                </View>
            )}
        </Formik>
    </View>
}

export default AddRoomForm;