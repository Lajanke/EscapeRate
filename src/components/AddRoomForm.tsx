import React, {useState} from 'react';
import { StyleSheet, Button, TextInput, View, Text, Image, SafeAreaView, } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Formik } from 'formik';
import { Room } from './HomeScreen';
import { showMessage } from "react-native-flash-message";
import * as yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

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
    setModalState: Function;
}

const AddRoomForm: React.FC<AddRoomFormProps> = (props) => {  
    const [show, setShow] = useState(false);
    const [uploadImage, setImage] = useState(false); 
    const addRoom = (values) => {
        const maxId: number = props.roomList.reduce((max: number, room: Room) => room.id > max ? room.id : max, 0);
        const newRoom: Room = {
            id: maxId + 1,
            name: values.name,
            date: values.date,
            escaped: values.escaped,
            groupSize: values.groupSize,
            time: values.time,
            timeLimit: values.timeLimit,
            company: values.company,
            image: values.image ? values.image : '',
        };
        props.setRoomList([newRoom, ...props.roomList]);
        props.setModalState(false);
       
        showMessage({
            message: 'New Room Added',
            type: 'success',
            duration: 1000,
          })
    }

    return <SafeAreaView>
        <ScrollView>
            <View>
                <Formik
                    initialValues={{
                        name: '',
                        date: new Date(),
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

                            <View style={styles.calendar}>
                                <Text style={{marginTop: 7, marginLeft: 3}}>Date Visited: {new Date(formikProps.values.date).toDateString()}</Text>  
                                <Icon name='calendar' size={24} style={{marginRight: 22}} onPress={() => {
                                setShow(true);
                                }}/>
                            </View> 

                            {show && (
                                <View>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={formikProps.values.date} 
                                        display="default"
                                        maximumDate={new Date()}
                                        onChange={(event, selectedDate) => {
                                            setShow(false);
                                            // update formik last as this will cause a re-render
                                            formikProps.setFieldValue('date', selectedDate || formikProps.values.date);
                                        }}
                                    />
                                </View>
                            )}

                            <TextInput placeholder='Company' 
                            onChangeText={formikProps.handleChange('company')}
                            value={formikProps.values.company}
                            style={styles.input}
                            />

                            <View style={styles.imageUploadButton}>
                                <Button
                                    title='Upload Image'
                                    color='#384963'
                                    onPress={() => {
                                        const options = {
                                            noData: true
                                        };
                                    ImagePicker.launchImageLibrary(options, (response) => {
                                        if (response.path) {     
                                            formikProps.values.image = `${response.path}`
                                            setImage(true)
                                        }
                                    });
                                    }}
                                >
                            </Button>
                            {uploadImage && (
                                <Image source={{uri: (`file:///${formikProps.values.image}`)}} style={{height: 100, resizeMode: 'contain', marginTop: 24}}/>
                            )}
                            <View style={styles.submitButton}>
                            <Button title='submit' onPress={formikProps.handleSubmit} color='#4ba358' />
                            </View>
                            
                            </View>
                        </View>   
                    )}
                </Formik>
                <View style={styles.closeButton}>
          <Button title='Close Form' onPress={() => props.setModalState(false)} color='orange' />
          </View>
            </View>
        </ScrollView>
    </SafeAreaView> 
}

const styles = StyleSheet.create({
    formContainer: {
        marginHorizontal: 24,
        marginTop: 40,
        padding: 16,
        paddingBottom: 24,
        borderWidth: 1,
        borderColor: '#bac8de',
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
    },
    calendar: {
       flexDirection: 'row',
       justifyContent: 'space-between' 
    },
    closeButton: {
        marginHorizontal: 40,
        marginVertical: 24,
      }
  });
  

export default AddRoomForm;