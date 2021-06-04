import React from "react";
import styled from "styled-components/native";

let today = new Date().toISOString().slice(0, 10);

export default function Header() {
	return (
		<ComponentContainer>
			<SomeContainer>
				<HeaderText>Welcome to</HeaderText>
				<HeaderText>Joko's To-Do List!</HeaderText>
				<HeaderText>:D</HeaderText>
			</SomeContainer>
			<HeaderList>{today}</HeaderList>
		</ComponentContainer>
	);
}

const ComponentContainer = styled.View`
	height: 100px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const SomeContainer = styled.View`
	flex-direction: column;
	align-items: center;
`;

const HeaderText = styled.Text`
	color: white;
	font-size: 20px;
`;

const HeaderList = styled.Text`
	color: white;
	font-size: 18px;
	margin-right: 20px;
`;