import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

export default function Footer() {
	return (
	<ComponentContainer>
		<FooterText>Crafted by Andi Arizal</FooterText>
	</ComponentContainer>
	);
}

const ComponentContainer = styled.View`
	align-items: left;
	flex-direction: row;
`;

const FooterText = styled.Text`
	color: white;
	font-size: 18px;
`;