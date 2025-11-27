import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

export const AdminContainer = styled.div`
	background: var(--dark-bg-primary);
	min-height: 100vh;
	color: var(--dark-text-primary);
	font-family: 'Inter', sans-serif;

	.ant-layout {
		background: var(--dark-bg-primary);
	}

	.ant-menu {
		background: transparent !important;
		border: none !important;

		.ant-menu-item {
			color: var(--dark-text-secondary) !important;
			border-radius: var(--radius-lg) !important;
			margin: 4px 0 !important;
			height: 48px !important;
			display: flex !important;
			align-items: center !important;
			font-weight: 500 !important;
			font-family: 'Inter', sans-serif !important;
			transition: all 0.3s ease !important;

			&:hover {
				background: var(--dark-bg-tertiary) !important;
				color: var(--primary-color) !important;
				transform: translateX(4px);
			}

			&.ant-menu-item-selected {
				background: var(--gradient-primary) !important;
				color: white !important;
				box-shadow: var(--shadow-lg);

				&::after {
					border: none !important;
				}
			}

			.ant-menu-item-icon {
				font-size: 18px !important;
				margin-right: 12px !important;
			}
		}

		.ant-menu-item-group-title {
			color: var(--dark-text-tertiary) !important;
			font-size: 12px !important;
			font-weight: 600 !important;
			text-transform: uppercase !important;
			letter-spacing: 1px !important;
			padding: 16px 24px 8px !important;
		}
	}
`;

export const AdminSidebar = styled(Sider)`
	background: var(--dark-bg-secondary) !important;
	border-right: 1px solid var(--dark-border);
	box-shadow: var(--shadow-xl);

	.ant-layout-sider-trigger {
		background: var(--dark-bg-tertiary) !important;
		color: var(--dark-text-secondary) !important;
		border-top: 1px solid var(--dark-border) !important;
		transition: all 0.3s ease !important;

		&:hover {
			background: var(--primary-color) !important;
			color: white !important;
		}
	}

	.ant-layout-sider-children {
		overflow-y: auto;
		overflow-x: hidden;

		&::-webkit-scrollbar {
			width: 6px;
		}

		&::-webkit-scrollbar-track {
			background: var(--dark-bg-primary);
		}

		&::-webkit-scrollbar-thumb {
			background: var(--dark-border);
			border-radius: 3px;

			&:hover {
				background: var(--dark-bg-tertiary);
			}
		}
	}
`;

export const SidebarLogo = styled.div`
	padding: 24px 16px;
	border-bottom: 1px solid var(--dark-border);
	display: flex;
	align-items: center;
	gap: 12px;
	background: var(--dark-bg-secondary);
	transition: all 0.3s ease;

	.logo-icon {
		width: 48px;
		height: 48px;
		background: var(--gradient-primary);
		border-radius: var(--radius-xl);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow-lg);
		flex-shrink: 0;

		.anticon {
			font-size: 24px;
			color: var(--dark-text-primary);
		}
	}

	.logo-text {
		overflow: hidden;

		.ant-typography {
			color: var(--dark-text-primary) !important;
			margin-bottom: 4px !important;
			font-family: 'Inter', sans-serif !important;
			font-weight: 700 !important;
			letter-spacing: -0.5px;
		}
	}

	${(props) =>
		props.collapsed &&
		`
        justify-content: center;
        padding: 24px 8px;
    `}
`;

export const AdminContent = styled(Content)`
	background: var(--dark-bg-primary);
	overflow: hidden;
	position: relative;
`;

export const AdminMain = styled.div`
	height: 100%;
	overflow-y: auto;
	padding: 0;
	background: var(--dark-bg-primary);

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: var(--dark-bg-secondary);
	}

	&::-webkit-scrollbar-thumb {
		background: var(--dark-border);
		border-radius: 4px;

		&:hover {
			background: var(--dark-bg-tertiary);
		}
	}
`;

export const AdminHeader = styled.div`
	background: var(--dark-bg-secondary);
	padding: 16px 24px;
	border-bottom: 1px solid var(--dark-border);
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-shadow: var(--shadow-sm);

	.admin-header-title {
		color: var(--dark-text-primary);
		font-size: 20px;
		font-weight: 600;
		margin: 0;
	}
`;
