import React from 'react';
import { View, Text, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native';
import moment from 'moment';
import { fonts, accent, primary, secondary } from '../../constants';

const DEVICE_WIDTH = Dimensions.get('window').width;

const Day = (props) => {
	let { day, dayProps } = props;
	let dayStyle = { backgroundColor: 'transparent', position: 'relative', width: "14.28%" };
	let textDayStyle = { color: primary.BLACK };
	switch (day.type) {
		//for strike line : textDecorationLine: 'line-through', textDecorationStyle: 'solid'
		case "single":
			dayStyle = { backgroundColor: accent.ERROR, borderRadius: 3, width: "14.28%" }
			textDayStyle = { color: primary.WHITE, fontSize: 14, fontFamily: fonts.MEDIUM };
			break;
		case "first":
			dayStyle = { backgroundColor: accent.ERROR, borderBottomLeftRadius: 3, borderTopLeftRadius: 3, width: "14.28%" }
			textDayStyle = { color: primary.WHITE, fontSize: 14, fontFamily: fonts.MEDIUM };
			break;
		case "last":
			dayStyle = { backgroundColor: accent.ERROR, borderBottomRightRadius: 3, borderTopRightRadius: 3, width: "14.28%" }
			textDayStyle = { color: primary.WHITE, fontSize: 14, fontFamily: fonts.MEDIUM };
			break;
		case "between":
			dayStyle = { backgroundColor: accent.LIGHT_ERROR, width: "14.28%" }
			textDayStyle = { color: secondary.DARK_GREY, fontSize: 14, fontFamily: fonts.MEDIUM };
			break;
		case "disabled":
		case "blockout":
			textDayStyle = { color: '#ccc' };
		default: break;
	}

	if (day.date) {
		if (day.type == 'disabled')
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
					<View style={{ ...dayStyle, ...styles.buttonContainer }}>
						<Text style={{ ...textDayStyle, ...styles.dayTextStyle }}>{moment(day.date, 'YYYYMMDD').date()}</Text>
						{day.date == moment().format("YYYYMMDD") ? (<View style={styles.absoluteContainer}><Text style={{ fontSize: Math.floor(DEVICE_WIDTH / 17), fontWeight: 'bold', color: '#ccc', textAlign: 'center' }}>__</Text></View>) : null}
					</View>
				</TouchableWithoutFeedback>
			);
		else if (day.type == 'blockout') {
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
					<View style={{ ...dayStyle, ...styles.buttonContainer }}>
						<Text style={{ ...textDayStyle, ...styles.dayTextStyle }}>{moment(day.date, 'YYYYMMDD').date()}</Text>
						<View style={styles.blockoutContainer}><Text style={{ fontSize: Math.floor(DEVICE_WIDTH / 17), color: '#ccc', textAlign: 'center' }}>__</Text></View>
					</View>
				</TouchableWithoutFeedback>
			);
		}
		else
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle} onPress={() => props.onSelectDate(moment(day.date, 'YYYYMMDD'))}>
					<View style={{ ...dayStyle, ...styles.buttonContainer }}>
						<Text style={{ ...textDayStyle, ...styles.dayTextStyle }}>{moment(day.date, 'YYYYMMDD').date()}</Text>
						{day.date == moment().format("YYYYMMDD") ? (<View style={styles.absoluteContainer}><Text style={{ ...styles.normalContainer, color: dayProps.selectedBackgroundColor }}>__</Text></View>) : null}
					</View>
				</TouchableWithoutFeedback>
			);
	}
	else
		return (
			<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
				<View style={{ ...dayStyle, ...styles.buttonContainer }}>
					<Text style={{ ...textDayStyle, ...styles.dayTextStyle }}>{null}</Text>
				</View>
			</TouchableWithoutFeedback>
		);
}

export default Day;


const styles = StyleSheet.create({
	buttonContainer: {
		height: 40,
		justifyContent: 'center'
	},
	dayTextStyle: {
		textAlign: "center",
		backgroundColor: 'transparent',
		fontSize: Math.floor(DEVICE_WIDTH / 26)
	},
	absoluteContainer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	blockoutContainer: {
		position: 'absolute',
		top: Math.floor(DEVICE_WIDTH / -22),
		bottom: 0,
		left: 0,
		right: 0,
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	normalContainer: {
		fontSize: Math.floor(DEVICE_WIDTH / 17),
		fontWeight: 'bold',
		textAlign: 'center'
	}
})