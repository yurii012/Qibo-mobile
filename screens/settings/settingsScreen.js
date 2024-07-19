import React, { useState } from "react";
import { SafeAreaView, Dimensions, TextInput, View, ScrollView, StatusBar, TouchableOpacity, Image, Text, StyleSheet, ImageBackground } from "react-native";
import { Colors, Fonts, Sizes } from "../../constants/styles";
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Switch } from 'react-native-paper';
import { Slider } from '@rneui/themed';
import Dialog from "react-native-dialog";

const { width } = Dimensions.get('window');

const SettingsScreen = ({ navigation }) => {

    const [state, setState] = useState({
        email: 'music@gmail.com',
        password: '••••••••••',
        sleepTime: false,
        musicQuality: 80,
        autoPlay: false,
        audioNormalization: true,
        smartVolume: false,
        musicFromLock: true,
        skipSlienceBetweenTracks: false,
        musicWithScreenOff: true,
        darkMode: false,
        playBackWhenDeviceConnect: true,
        facebookConnection: true,
        twitterConnection: false,
        instagramConnection: true,
        showEmailDialog: false,
        editableEmail: 'music@gmail.com',
        showPasswordDialog: false,
        oldPassword: null,
        newPassord: null,
        confirmPassword: null,
        showLogoutDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        email,
        password,
        sleepTime,
        musicQuality,
        autoPlay,
        audioNormalization,
        smartVolume,
        musicFromLock,
        skipSlienceBetweenTracks,
        musicWithScreenOff,
        darkMode,
        playBackWhenDeviceConnect,
        facebookConnection,
        twitterConnection,
        instagramConnection,
        showEmailDialog,
        editableEmail,
        showPasswordDialog,
        oldPassword,
        newPassord,
        confirmPassword,
        showLogoutDialog,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 15.0 }}
                >
                    {cornerImage()}
                    {header()}
                    {userAccountInfo()}
                    {divider()}
                    {upgradePremiumButton()}
                    {playBackInfo()}
                    {divider()}
                    {generalInfo()}
                    {divider()}
                    {connectionsInfo()}
                    {divider()}
                    {logoutText()}
                </ScrollView>
            </View>
            {editEmailDialog()}
            {editPasswordDialog()}
            {logoutDialog()}
        </SafeAreaView>
    )

    function logoutDialog() {
        return (
            <Dialog.Container
                visible={showLogoutDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0, padding: 0.0 }}
            >
                <View style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        textAlign: 'center',
                        ...Fonts.blackColor18Bold,
                        paddingTop: Sizes.fixPadding * 2.0,
                    }}>
                        Are you sure want to Logout?
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showLogoutDialog: false })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor15Bold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                updateState({ showLogoutDialog: false })
                                navigation.push('Signin');
                            }}
                            style={styles.okButtonStyle}
                        >
                            <LinearGradient
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                                colors={[
                                    'rgba(255, 124, 0,1)',
                                    'rgba(41, 10, 89, 0.9)',
                                ]}
                                style={styles.okButtonGradientStyle}
                            >
                                <Text style={{ ...Fonts.whiteColor15Bold }}>
                                    Logout
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container >
        )
    }

    function editPasswordDialog() {
        return (
            <Dialog.Container
                visible={showPasswordDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0, padding: 0.0 }}
            >
                <View style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        ...Fonts.blackColor18Bold,
                        paddingVertical: Sizes.fixPadding * 2.0,
                    }}>
                        Change Your Password
                    </Text>
                    <View style={{ width: '100%' }}>
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Old Password"
                            placeholderTextColor={Colors.greenColor}
                            selectionColor={Colors.primaryColor}
                            value={oldPassword}
                            onChangeText={(value) => updateState({ oldPassword: value })}
                            style={styles.textFieldStyle}
                        />
                    </View>
                    <View style={{ width: '100%' }}>
                        <TextInput
                            secureTextEntry={true}
                            selectionColor={Colors.primaryColor}
                            placeholder="New Password"
                            placeholderTextColor={Colors.greenColor}
                            value={newPassord}
                            onChangeText={(value) => updateState({ newPassord: value })}
                            style={{ marginVertical: Sizes.fixPadding, ...styles.textFieldStyle }}
                        />
                    </View>
                    <View style={{ width: '100%' }}>
                        <TextInput
                            secureTextEntry={true}
                            selectionColor={Colors.primaryColor}
                            placeholder="Confirm New Password"
                            placeholderTextColor={Colors.greenColor}
                            value={confirmPassword}
                            onChangeText={(value) => updateState({ confirmPassword: value })}
                            style={styles.textFieldStyle}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({
                                showPasswordDialog: false,
                                oldPassword: null, newPassord: null, confirmPassword: null
                            })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor15Bold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                updateState({
                                    showPasswordDialog: false,
                                    oldPassword: null, newPassord: null, confirmPassword: null
                                })
                            }}
                            style={styles.okButtonStyle}
                        >
                            <LinearGradient
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                                colors={[
                                    'rgba(255, 124, 0,1)',
                                    'rgba(41, 10, 89, 0.9)',
                                ]}
                                style={styles.okButtonGradientStyle}
                            >
                                <Text style={{ ...Fonts.whiteColor15Bold }}>
                                    Okay
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container >
        )
    }

    function editEmailDialog() {
        return (
            <Dialog.Container
                visible={showEmailDialog}
                contentStyle={styles.dialogWrapStyle}
                headerStyle={{ margin: 0.0, padding: 0.0 }}
            >
                <View style={{
                    backgroundColor: 'white',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        ...Fonts.blackColor18Bold,
                        paddingVertical: Sizes.fixPadding * 2.0,
                    }}>
                        Change Email
                    </Text>
                    <View style={{ width: '100%' }}>
                        <TextInput
                            selectionColor={Colors.primaryColor}
                            value={editableEmail}
                            onChangeText={(value) => updateState({ editableEmail: value })}
                            style={styles.textFieldStyle}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => updateState({ showEmailDialog: false, editableEmail: email })}
                            style={styles.cancelButtonStyle}
                        >
                            <Text style={{ ...Fonts.blackColor15Bold }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                updateState({ showEmailDialog: false, email: editableEmail })
                            }}
                            style={styles.okButtonStyle}
                        >
                            <LinearGradient
                                start={{ x: 1, y: 0 }}
                                end={{ x: 0, y: 0 }}
                                colors={[
                                    'rgba(255, 124, 0,1)',
                                    'rgba(41, 10, 89, 0.9)',
                                ]}
                                style={styles.okButtonGradientStyle}
                            >
                                <Text style={{ ...Fonts.whiteColor15Bold }}>
                                    Okay
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </Dialog.Container >
        )
    }

    function logoutText() {
        return (
            <Text
                onPress={() => updateState({ showLogoutDialog: true })}
                style={{
                    marginBottom: Sizes.fixPadding + 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    ...Fonts.pinkColor14SemiBold
                }}
            >
                Logout
            </Text>
        )
    }

    function connectionsInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Bold }}>
                    CONNECTIONS
                </Text>
                {facebookConnectionInfo()}
                {twitterConnectionInfo()}
                {instagramConnectionInfo()}
            </View>
        )
    }

    function instagramConnectionInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Instagram
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={instagramConnection}
                    onValueChange={() => updateState({ instagramConnection: !instagramConnection })}
                />
            </View>
        )
    }

    function twitterConnectionInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Twitter
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={twitterConnection}
                    onValueChange={() => updateState({ twitterConnection: !twitterConnection })}
                />
            </View>
        )
    }

    function facebookConnectionInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Facebook
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={facebookConnection}
                    onValueChange={() => updateState({ facebookConnection: !facebookConnection })}
                />
            </View>
        )
    }

    function generalInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Bold }}>
                    GENERAL
                </Text>
                {darkModeInfo()}
                {playBackWhenDeviceConnectInfo()}
            </View>
        )
    }

    function playBackWhenDeviceConnectInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Smart Playback When Devices Connect
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={playBackWhenDeviceConnect}
                    onValueChange={() => updateState({ playBackWhenDeviceConnect: !playBackWhenDeviceConnect })}
                />
            </View>
        )
    }

    function darkModeInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Dark Mode
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={darkMode}
                    onValueChange={() => updateState({ darkMode: !darkMode })}
                />
            </View>
        )
    }

    function playBackInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor15Bold }}>
                    PLAYBACK
                </Text>
                {sleepTimeInfo()}
                {musicQualityInfo()}
                {autoPlayInfo()}
                {audioNormalizationInfo()}
                {SmartVolumeInfo()}
                {controlMusicFromLockInfo()}
                {skipSlienceBetweenTracksInfo()}
                {musicWithScreenOffInfo()}
            </View>
        )
    }

    function musicWithScreenOffInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        Music With Screen Off
                    </Text>
                    <Text style={{ width: width - 125, ...Fonts.greenColor10Medium }}>
                        Connect headphones to listen to music while your screen is off.
                    </Text>
                </View>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={musicWithScreenOff}
                    onValueChange={() => updateState({ musicWithScreenOff: !musicWithScreenOff })}
                />
            </View>
        )
    }

    function skipSlienceBetweenTracksInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Skip Slience Between Tracks
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={skipSlienceBetweenTracks}
                    onValueChange={() => updateState({ skipSlienceBetweenTracks: !skipSlienceBetweenTracks })}
                />
            </View>
        )
    }

    function controlMusicFromLockInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Control Music From Loack Screen
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={musicFromLock}
                    onValueChange={() => updateState({ musicFromLock: !musicFromLock })}
                />
            </View>
        )
    }

    function SmartVolumeInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        Smart Volume
                    </Text>
                    <Text style={{ ...Fonts.greenColor10Medium }}>
                        Automatically adjust each track to the same volume.
                    </Text>
                </View>

                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={smartVolume}
                    onValueChange={() => updateState({ smartVolume: !smartVolume })}
                />
            </View>
        )
    }

    function audioNormalizationInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Audio Normalization
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={audioNormalization}
                    onValueChange={() => updateState({ audioNormalization: !audioNormalization })}
                />
            </View>
        )
    }

    function autoPlayInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Autoplay
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={autoPlay}
                    onValueChange={() => updateState({ autoPlay: !autoPlay })}
                />
            </View>
        )
    }

    function musicQualityInfo() {
        return (
            <>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        Music Quality
                    </Text>
                    <Text style={{ ...Fonts.greenColor12SemiBold }}>
                        HIGH
                    </Text>
                </View>
                <View style={styles.songProcessSliderWrapStyle}>
                    <Slider
                        value={musicQuality}
                        onValueChange={(value) => updateState({ musicQuality: value })}
                        maximumValue={100}
                        minimumValue={0}
                        style={{ height: 12.0 }}
                        minimumTrackTintColor={Colors.primaryColor}
                        maximumTrackTintColor={Colors.secondaryColor}
                        thumbTintColor={Colors.secondaryColor}
                        trackStyle={{ height: 3.0, backgroundColor: Colors.primaryColor }}
                        thumbStyle={{ height: 15, width: 15, backgroundColor: Colors.primaryColor }}
                    />
                </View>
            </>
        )
    }

    function sleepTimeInfo() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                    Sleep Time
                </Text>
                <Switch
                    trackColor={{ true: Colors.greenColor, false: Colors.greenColor }}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    color='#D81B60'
                    value={sleepTime}
                    onValueChange={() => updateState({ sleepTime: !sleepTime })}
                />
            </View>
        )
    }

    function upgradePremiumButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Subscribe')}
            >
                <ImageBackground
                    source={require('../../assets/images/google-sign.png')}
                    style={styles.upgradePremiumButtonStyle}
                    borderRadius={Sizes.fixPadding - 7.0}
                    resizeMode="contain"
                >
                    <Text style={{ ...Fonts.whiteColor18Bold }}>
                        Upgrade to My Music Premium
                    </Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    function divider() {
        return (
            <View
                style={{
                    backgroundColor: Colors.greenColor,
                    height: 1.0,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding + 5.0,
                }}
            />
        )
    }

    function userAccountInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginVertical: Sizes.fixPadding, ...Fonts.blackColor15Bold }}>
                    USER ACCOUNT
                </Text>
                <View style={{ marginBottom: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor13SemiBold }}>
                        {email}
                    </Text>
                    <Text
                        onPress={() => updateState({ showEmailDialog: true })}
                        style={{ ...Fonts.greenColor12SemiBold }}
                    >
                        EDIT
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor13SemiBold }}>
                        {password}
                    </Text>
                    <Text
                        onPress={() => updateState({ showPasswordDialog: true })}
                        style={{ ...Fonts.greenColor12SemiBold }}
                    >
                        EDIT
                    </Text>
                </View>
            </View>
        )
    }

    function cornerImage() {
        return (
            <View>
                <Image
                    source={require('../../assets/images/corner-design.png')}
                    style={{
                        width: '100%',
                        height: 170,
                    }}
                />
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaskedView
                    style={{ flex: 1, height: 28, }}
                    maskElement={
                        <Text style={{ ...Fonts.bold22, }}>
                            Settings
                        </Text>
                    }>
                    <LinearGradient
                        start={{ x: 1, y: 0.2 }}
                        end={{ x: 1, y: 1 }}
                        colors={['rgba(255, 124, 0,1)', 'rgba(41, 10, 89, 1)']}
                        style={{ flex: 1 }}
                    />
                </MaskedView >
            </View >
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 30.0,
    },
    upgradePremiumButtonStyle: {
        alignItems: 'center',
        height: 50.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center',
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    songProcessSliderWrapStyle: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding - 5.0,
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: -Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E2E2E2',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    okButtonStyle: {
        flex: 0.50,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    okButtonGradientStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        borderRadius: Sizes.fixPadding - 5.0,
    },
    textFieldStyle: {
        ...Fonts.blackColor13Medium,
        paddingBottom: Sizes.fixPadding - 2.0,
        borderBottomColor: Colors.greenColor,
        borderBottomWidth: 0.70,
    }
})

export default SettingsScreen;
