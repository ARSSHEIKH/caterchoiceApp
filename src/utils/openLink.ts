import { Linking } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";

export const openLink = async (url: any) => {
    const backgroundColor = "#000"

    try {
        if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.close();
            const result = await InAppBrowser.open(url, {
                // iOS Properties
                preferredBarTintColor: '#453AA4',
                preferredControlTintColor: 'white',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: backgroundColor,
                secondaryToolbarColor: backgroundColor,
                // navigationBarColor: 'black',
                // navigationBarDividerColor: 'white',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                headers: {
                    'my-custom-header': 'my custom header value'
                }
            });

            InAppBrowser.close();

        }
        else Linking.openURL(url)
    } catch (error) {
    }
}