import { View, StyleSheet } from 'react-native';

import Constants from '../Constants';

const width = Constants.WINDOW_WIDTH

const Net = () => {

    const numberOfDots = Math.floor(width / 6);

    const renderDots = () => {
        const dots = [];
        for (let i = 0; i < numberOfDots; i++) {
            dots.push(<View key={i} style={styles.dot} />);
        }
        return dots;
    };

    return (
        <View style={styles.container}>
            <View style={styles.dottedLine}>
                {renderDots()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dottedLine: {
        flexDirection: 'row',
    },
    dot: {
        width: 8,
        height: 1,
        backgroundColor: 'white',
        marginHorizontal: 5,
    },
});

export default Net;
