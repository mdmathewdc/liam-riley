import React, { useEffect, useRef } from 'react';
import { PaperScope, Path, Tool, Point } from 'paper';
import 'paper/dist/paper-core.min';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

type Props = {
	windowHeight: number;
	lightColour: string;
}

const DrawingCanvasWrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	height: 100dvh;
	width: 100%;
`;

const DrawingCanvas = (props: Props) => {
	const {
		windowHeight,
		lightColour
	} = props;

	const maxPathLength = 750;

	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	let tool: paper.Tool | null = null;
	let path: paper.Path | null = null;
	let points: Point[] = [];

	useEffect(() => {
		// Set up paper.js when the component mounts
		const paperScope = new PaperScope();

		if (canvasRef.current) {
		paperScope.setup(canvasRef.current);
		paperScope.activate();

		// Create a new drawing tool
		tool = new Tool();

		// Configure the drawing tool
		tool.minDistance = 1; // Minimum distance between points
		tool.maxDistance = 10; // Maximum distance between points

		// Handle drawing logic
		tool.onMouseMove = (event: paper.MouseEvent) => {
			if (!path) {
			path = new Path();
			path.strokeColor = lightColour;
			path.strokeWidth = 4; // Adjust the thickness of the line here
			path.add(event.point);
			} else {
			// Smooth the line by adding an intermediate point
			const lastPoint = path.segments[path.segments.length - 1].point;
			const newPoint = event.point.add(lastPoint).divide(2);
			path.add(newPoint);

			// Store points in the array to limit path length
			points.push(newPoint);

			// Remove excess points if path length exceeds the maximum
			if (points.length > maxPathLength) {
				const numPointsToRemove = points.length - maxPathLength;
				for (let i = 0; i < numPointsToRemove; i++) {
				path.removeSegment(0); // Remove the oldest point from the path
				points.shift(); // Remove the oldest point from the array
				}
			}
			}

			// Smooth the path to make it less jagged
			path.smooth();
		};

		// Clean up when the component unmounts
		return () => {
			paperScope.remove();
		};
		}
	}, [lightColour]);

	const { scrollY } = useScroll();

	const opacity = useTransform(
		scrollY,
		[windowHeight, windowHeight * 2],
		[1, 0]
	);

  return (
	<DrawingCanvasWrapper
		style={{ opacity }}
	>
		<canvas
		  ref={canvasRef}
		  style={{
			width: '100%',
			height: '100%',
			touchAction: 'none', // Disable touch actions to prevent scrolling on touch devices
		  }}
		/>
	</DrawingCanvasWrapper>
  );
};

export default DrawingCanvas;
