import { Col, Image, InputNumber } from 'antd';
import styled from 'styled-components';

export const ProductContainer = styled.div`
	background: var(--white);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-md);
	overflow: hidden;
	margin-bottom: var(--spacing-lg);
`;

export const ProductRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: var(--spacing-lg);
	padding: var(--spacing-lg);

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: var(--spacing-md);
	}
`;

export const ImageSection = styled.div`
	.main-image {
		width: 100%;
		border-radius: var(--radius-md);
		overflow: hidden;
		margin-bottom: var(--spacing-md);

		.ant-image {
			width: 100%;

			img {
				width: 100%;
				height: 400px;
				object-fit: contain;
				background: var(--gray-50);
			}
		}
	}
`;

export const ThumbnailGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: var(--spacing-sm);

	@media (max-width: 768px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (max-width: 480px) {
		grid-template-columns: repeat(3, 1fr);
	}
`;

export const WrapperStyleImageSmall = styled(Image)`
	width: 64px;
	height: 64px;
	border-radius: var(--radius-sm);
	overflow: hidden;
	border: 2px solid var(--border-color);
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		border-color: var(--primary-color);
		transform: scale(1.05);
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const WrapperStyleColImage = styled(Col)`
	flex-basis: unset;
	display: flex;
`;

export const ProductInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
`;

export const WrapperStyleNameProduct = styled.h1`
	color: var(--text-primary);
	font-size: var(--font-size-2xl);
	font-weight: var(--font-weight-bold);
	line-height: var(--line-height-tight);
	margin: 0;
	word-break: break-word;

	@media (max-width: 768px) {
		font-size: var(--font-size-xl);
	}
`;

export const RatingSection = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);

	.ant-rate {
		.ant-rate-star {
			.ant-rate-star-first,
			.ant-rate-star-second {
				color: #fadb14;
			}
		}
	}
`;

export const WrapperStyleTextSell = styled.span`
	font-size: var(--font-size-base);
	line-height: var(--line-height-normal);
	color: var(--text-secondary);
	font-weight: var(--font-weight-medium);
`;

export const WrapperPriceProduct = styled.div`
	background: linear-gradient(
		135deg,
		var(--primary-50) 0%,
		var(--primary-100) 100%
	);
	border-radius: var(--radius-lg);
	border: 1px solid var(--primary-200);
	padding: var(--spacing-md);
`;

export const WrapperPriceTextProduct = styled.h2`
	font-size: var(--font-size-3xl);
	line-height: var(--line-height-tight);
	font-weight: var(--font-weight-bold);
	color: var(--primary-color);
	margin: 0;

	@media (max-width: 768px) {
		font-size: var(--font-size-2xl);
	}
`;

export const WrapperAddressProduct = styled.div`
	background: var(--gray-50);
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	border: 1px solid var(--border-color);

	span {
		font-size: var(--font-size-base);
		color: var(--text-secondary);
	}

	span.address {
		text-decoration: underline;
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	span.change-address {
		color: var(--primary-color);
		font-weight: var(--font-weight-medium);
		cursor: pointer;
		margin-left: var(--spacing-xs);

		&:hover {
			color: var(--primary-600);
		}
	}
`;

export const QuantitySection = styled.div`
	padding: var(--spacing-md);
	border-top: 1px solid var(--border-color);
	border-bottom: 1px solid var(--border-color);
	background: var(--gray-50);
	border-radius: var(--radius-md);

	.quantity-label {
		font-size: var(--font-size-base);
		font-weight: var(--font-weight-medium);
		color: var(--text-primary);
		margin-bottom: var(--spacing-sm);
	}
`;

export const WrapperQualityProduct = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid var(--border-color);
	border-radius: var(--radius-md);
	background: var(--white);
	overflow: hidden;
	width: fit-content;

	button {
		border: none;
		background: transparent;
		cursor: pointer;
		padding: var(--spacing-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.3s ease;

		&:hover {
			background: var(--gray-100);
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.anticon {
			color: var(--text-primary);
			font-size: 16px;
		}
	}
`;

export const WrapperInputNumber = styled(InputNumber)`
	&.ant-input-number.ant-input-number-sm {
		width: 60px;
		border: none;
		border-left: 1px solid var(--border-color);
		border-right: 1px solid var(--border-color);
		border-radius: 0;
		text-align: center;

		.ant-input-number-input {
			text-align: center;
			font-weight: var(--font-weight-medium);
		}

		.ant-input-number-handler-wrap {
			display: none !important;
		}

		&:focus {
			border-color: var(--primary-color);
			box-shadow: none;
		}
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	gap: var(--spacing-md);
	flex-wrap: wrap;

	@media (max-width: 480px) {
		flex-direction: column;

		button {
			width: 100% !important;
		}
	}
`;

export const ErrorMessage = styled.div`
	color: var(--red-500);
	font-size: var(--font-size-sm);
	font-weight: var(--font-weight-medium);
	margin-top: var(--spacing-xs);
	padding: var(--spacing-xs) var(--spacing-sm);
	background: var(--red-50);
	border: 1px solid var(--red-200);
	border-radius: var(--radius-sm);
`;

export const CommentSection = styled.div`
	margin-top: var(--spacing-lg);
	padding: var(--spacing-lg);
	background: var(--white);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-sm);
`;

export const ServiceCommitments = styled.div`
	margin-top: var(--spacing-lg);
	background: var(--white);
	border-radius: var(--radius-lg);
	box-shadow: var(--shadow-md);
	overflow: hidden;
`;

export const ServiceHeader = styled.div`
	background: linear-gradient(
		135deg,
		var(--primary-500) 0%,
		var(--primary-600) 100%
	);
	color: var(--white);
	padding: var(--spacing-lg);
	text-align: center;

	h3 {
		margin: 0;
		font-size: var(--font-size-xl);
		font-weight: var(--font-weight-bold);
	}

	p {
		margin: var(--spacing-xs) 0 0 0;
		font-size: var(--font-size-base);
		opacity: 0.9;
	}
`;

export const ServiceGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: var(--spacing-lg);
	padding: var(--spacing-lg);

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
	}
`;

export const ServiceItem = styled.div`
	display: flex;
	align-items: flex-start;
	gap: var(--spacing-md);
	padding: var(--spacing-md);
	border-radius: var(--radius-md);
	background: var(--gray-50);
	transition: all 0.3s ease;

	&:hover {
		background: var(--primary-50);
		transform: translateY(-2px);
		box-shadow: var(--shadow-sm);
	}
`;

export const ServiceIcon = styled.div`
	flex-shrink: 0;
	width: 48px;
	height: 48px;
	border-radius: var(--radius-full);
	background: linear-gradient(
		135deg,
		var(--primary-400) 0%,
		var(--primary-500) 100%
	);
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--white);
	font-size: 20px;
`;

export const ServiceContent = styled.div`
	flex: 1;

	h4 {
		margin: 0 0 var(--spacing-xs) 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--text-primary);
	}

	p {
		margin: 0;
		font-size: var(--font-size-base);
		color: var(--text-secondary);
		line-height: var(--line-height-relaxed);
	}
`;

export const PolicySection = styled.div`
	background: var(--blue-50);
	border: 1px solid var(--blue-200);
	border-radius: var(--radius-md);
	padding: var(--spacing-lg);
	margin-top: var(--spacing-lg);

	h4 {
		margin: 0 0 var(--spacing-md) 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
		color: var(--blue-700);
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	ul {
		margin: 0;
		padding-left: var(--spacing-lg);
		list-style-type: none;

		li {
			position: relative;
			padding: var(--spacing-xs) 0;
			font-size: var(--font-size-base);
			color: var(--text-secondary);

			&:before {
				content: '✓';
				position: absolute;
				left: -20px;
				color: var(--green-500);
				font-weight: bold;
			}
		}
	}
`;
