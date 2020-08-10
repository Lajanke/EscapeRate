import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Formik, Field } from 'formik';
import { Room } from './HomeScreen';
import { showMessage } from "react-native-flash-message";
import * as yup from 'yup';
import ImagePicker from 'react-native-image-picker';

const newRoomSchema = yup.object({
    name: yup.string().required('Required'),
    groupSize: yup.string().test('is number 1-10', 'Must be a number between 1 - 10', (val: string): boolean => {
        return parseInt(val) < 11 && parseInt(val) > 0;
    }),
    time: yup.string().test('is number 1-120', 'Must be a number between 1 - 120', (val: string): boolean => {
        return parseInt(val) < 121 && parseInt(val) > 0;
    }),
    timeLimit: yup.string().test('is number 1-120', 'Must be a number between 1 - 120', (val: string): boolean => {
        return parseInt(val) < 121 && parseInt(val) > 0;
    }),
})

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
            timeLimit: values.timeLimit,
            company: values.company,
            image: values.image ? values.image : 'https://thumbs.dreamstime.com/b/combination-lock-quest-escape-room-vintage-to-be-opened-solved-126538995.jpg',
        };
        props.setRoomList([newRoom, ...props.roomList]);
        props.setModalState(false);
        showMessage({
            message: 'New Room Added',
            type: 'success',
            duration: 1000,
          }) 
    }

    return <View>
        <Formik
            initialValues={{
                name: '',
                escaped: false,
                timeLimit: '',
                time: '',
                groupSize: '',
                image: '',
                company: '',
            }}
            validationSchema={newRoomSchema}
            validateOnChange={true}
            onSubmit={(values) => {
                addRoom(values)
            }}
        >
            {(formikProps) => (
                <View style={styles.formContainer}>
                    <TextInput placeholder='Room name' 
                    onChangeText={formikProps.handleChange('name')}
                    value={formikProps.values.name}
                    style={styles.input}
                    />
                    {formikProps.touched.name && formikProps.errors.name &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{formikProps.errors.name}</Text>
                    }
                    <TextInput placeholder='Group Size' 
                    onChangeText={formikProps.handleChange('groupSize')}
                    value={formikProps.values.groupSize}
                    keyboardType={"numeric"}
                    style={styles.input}
                    />
                    {formikProps.touched.groupSize && formikProps.errors.groupSize &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{formikProps.errors.groupSize}</Text>
                    }
                    <TextInput placeholder='Time Limit' 
                    onChangeText={formikProps.handleChange('timeLimit')}
                    value={formikProps.values.timeLimit}
                    keyboardType={"numeric"}
                    style={styles.input}
                    />
                    {formikProps.touched.timeLimit && formikProps.errors.timeLimit &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{formikProps.errors.timeLimit}</Text>
                    }
                    <TextInput placeholder='How long did it take (minutes)' 
                    onChangeText={formikProps.handleChange('time')}
                    value={formikProps.values.time}
                    keyboardType={"numeric"}
                    style={styles.input}
                    />
                    {formikProps.touched.time && formikProps.errors.time &&
                        <Text style={{ fontSize: 10, color: 'red' }}>{formikProps.errors.time}</Text>
                    }
                    <View style={styles.checkboxRow}>
                        <Text style={styles.checkboxText}>Did You Escape?</Text>
                    <CheckBox
                        checked={formikProps.values.escaped}
                        iconType='material-community'
                        checkedIcon='lock-open-variant-outline'
                        uncheckedIcon='lock-outline'
                        onPress={() => {
                            formikProps.setFieldValue('escaped', !formikProps.values.escaped)}
                        }
                        checkedColor='green'
                        uncheckedColor='red'
                        iconRight={true}
                    />
                    
                    </View>
                    <TextInput placeholder='Company' 
                    onChangeText={formikProps.handleChange('company')}
                    value={formikProps.values.company}
                    style={styles.input}
                    />
                    <View style={styles.imageUploadButton}>
                        <Button
                            title='Upload Image'
                            onPress={() => {
                                const options = {
                                    noData: true
                                };
                            ImagePicker.launchImageLibrary(options, (response) => {
                                if (response.uri) {
                                    formikProps.values.image = `${response.uri}`

                                }
                            });
                            }}
                        >
                    </Button>
                    <View style={styles.submitButton}>
                    <Button title='submit' onPress={formikProps.handleSubmit} color='#536e96' />
                    </View>
                    
                    </View>
                </View>   
            )}
        </Formik>
    </View>
}

const styles = StyleSheet.create({
    formContainer: {
        margin: 40,
    },
    input: {
        paddingTop: 15,
        paddingBottom: 5,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#c7c7c7',
    },
    submitButton: {
        marginTop: 24,
    },
    imageUploadButton: {
        marginTop: 24,
    },
    checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxText: {
        marginTop: 20,
        marginLeft: 3,
    }
  });
  

export default AddRoomForm;