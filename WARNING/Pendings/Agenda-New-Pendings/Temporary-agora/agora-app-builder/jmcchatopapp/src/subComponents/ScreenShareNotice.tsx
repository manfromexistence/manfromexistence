/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/

import React, {useContext} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import chatContext from '../components/ChatContext';
/**
 *
 * @param uid - uid of the user 
 * @returns This component display overlay message "Screen sharing is active now" if user started sharing the screen.
 * why its needed : To prevent screensharing tunneling effect 
 * 
 */
function ScreenShareNotice({ uid }: any) {
    const {userList, localUid} = useContext(chatContext);
    /**
     * In a meeting a and b are there
        if a user sharing the screen - then that screenshare user uid is 1 for a’user end and its having xxx uid in another end
        if b user sharing the screen - then that screenshare user uid is 1 for b’user end and its having xxx uid in another end
     */
    return uid === 1
        ?
        <View style={styles.screenSharingMessageContainer}>
            <Text style={styles.screensharingMessage}>
            {userList[localUid]?.name + "'s screen share is active."} 
            </Text>
        </View>
        : null
}

const styles = StyleSheet.create({
    screenSharingMessageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        zIndex: 2,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: 15
    },
    screensharingMessage: {
        alignSelf: 'center',
        fontSize: 20,
        color: $config.SECONDARY_FONT_COLOR
    }
})

export default ScreenShareNotice;