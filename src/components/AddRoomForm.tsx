import React from 'react';
import { StyleSheet, Button, TextInput, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Formik, Field } from 'formik';
import { useLinkProps, PrivateValueStore } from '@react-navigation/native';
import { Room } from './HomeScreen';

export interface AddRoomFormProps {
    setRoomList: React.Dispatch<React.SetStateAction<Room[]>>; 
    roomList: Room[];
    setModalState: any;
}

const AddRoomForm: React.FC<AddRoomFormProps> = (props) => {
    const addRoom = (values) => {
        const maxId: number = props.roomList.reduce((max: number, room: Room) => room.id > max ? room.id : max, 0);
        const newRoom: Room = {
            id: maxId + 1,
            name: values.name,
            escaped: values.escaped,
            groupSize: values.groupSize,
            time: values.time,
            company: values.company,
            companyURL: values.companyURL,
            image: values.image,
        };
        props.setRoomList([newRoom, ...props.roomList]);
        props.setModalState(false)
    }

    return <View>
        <Formik
            initialValues={{
                name: '',
                escaped: false,
                time: '',
                groupSize: '',
                image: '',
                company: '',
                companyURL: '',
            }}
            onSubmit={(values) => {
                addRoom(values)
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
                    <TextInput placeholder='Time' 
                    onChangeText={formikProps.handleChange('time')}
                    value={formikProps.values.time}
                    keyboardType={"numeric"}
                    />
                    <CheckBox
                        title='Escaped?'
                        checked={formikProps.values.escaped}
                        iconType='material-community'
                        checkedIcon='lock-open-variant-outline'
                        uncheckedIcon='lock-outline'
                        onPress={() => {
                            formikProps.setFieldValue('escaped', !formikProps.values.escaped)}
                        }
                    />
                    <TextInput placeholder='Image' 
                    onChangeText={formikProps.handleChange('image')}
                    value={formikProps.values.image}
                    />
                    <TextInput placeholder='Company' 
                    onChangeText={formikProps.handleChange('company')}
                    value={formikProps.values.company}
                    />
                    <TextInput placeholder='Company Website' 
                    onChangeText={formikProps.handleChange('companyURL')}
                    value={formikProps.values.companyURL}
                    />
                    <Button title='submit' onPress={formikProps.handleSubmit} />
                </View>
            )}
        </Formik>
    </View>
}

export default AddRoomForm;