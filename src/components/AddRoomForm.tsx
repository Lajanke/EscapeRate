import React from 'react';
import { StyleSheet, Button, TextInput, View, Text,} from 'react-native';
import { Formik } from 'formik';

export default function AddRoomForm() {
    return <View>
        <Formik
            initialValues={{
                name: '',
                escaped: false,
                time: 54,
                groupSize: '2',
                image: '',
                company: '',
                companyURL: '',
            }}
            onSubmit={(values) => {
                console.log(values)
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