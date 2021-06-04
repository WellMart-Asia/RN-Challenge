import React, { useState } from "react";
import { View, CheckBox, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

/* const propTypes = {
	todo: PropTypes.shape({
		title: PropTypes.string,
		completed: PropTypes.bool,
		createdAt: PropTypes.number,
	}).isRequired,
	onUpdate: PropTypes.func.isRequired,
};


const onTodoItemToggle = (todo, propAction) => {
		propAction({
			...todo,
			completed: !todo.completed,
		});
	};
 */

export default function TodoList({ item, deleteItem }) {

	const [isChecked, setSelection] = useState(false);
	
	return (
		<ComponentContainer>
			<ListContainer>
				<CircleContainer>
					<CheckBox
						value={isChecked}
						onValueChange={setSelection}
						style={style.checkbox}
					/>
				</CircleContainer>
				<View>
					<TextItem>{item.value}</TextItem>
					<TextDate> Task</TextDate>
				</View>
				<IconContainer onPress={() => deleteItem(item.key)}>
					<MaterialIcons name="delete" size={24} color="midnightblue" />
				</IconContainer>
			</ListContainer>
		</ComponentContainer>
		);
	}
	

const style = StyleSheet.create({
	checkbox: {
		alignSelf: "center",
	}
});

// styles

const ListContainer = styled.TouchableOpacity`
	background-color: whitesmoke;
	height: auto;
	width: 350px;
	margin-bottom: 30px;
	border-radius: 10px;
	flex-direction: row;
	justify-content: space-between;
`;

const ComponentContainer = styled.View`
	flex-direction: row;
	justify-content: center;
	height: auto;
	width: auto;
`;

const TextItem = styled.Text`
	color: grey;
	width: 260px;
	height: auto;
	font-size: 20px;
	margin-top: 10px;
	margin-right: 20px;
	
`;

const TextDate = styled.Text`
	color: goldenrod;
	font-size: 15px;
	margin-right: 20px;
	
	border-radius: 10px;
	width: 40px;
`;

const IconContainer = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	margin-top: 15px;
	
	height: 40px;
	
	border-radius: 10px;
`;

const CircleContainer = styled.View`
	align-items: center;
	justify-content: center;
	padding-left: 5px;
`;
