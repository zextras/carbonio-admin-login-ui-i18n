/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
	Container,
	Row,
	Text,
	Divider,
	Button,
	Switch,
	Input
} from '@zextras/carbonio-design-system';
import ListRow from '../../list/list-row';

const ServerAdvanced: FC = () => {
	const { operation, server }: { operation: string; server: string } = useParams();
	const [t] = useTranslation();
	return (
		<Container mainAlignment="flex-start" background="gray6">
			<Container
				orientation="column"
				background="gray6"
				crossAlignment="flex-start"
				mainAlignment="flex-start"
			>
				<Row mainAlignment="flex-start" padding={{ all: 'large' }}>
					<Text size="medium" weight="bold">
						{t('backup.advanced', 'Advanced')}
					</Text>
				</Row>

				<Divider />

				<Container
					mainAlignment="flex-start"
					crossAlignment="flex-end"
					style={{ overflow: 'auto' }}
					padding={{ all: 'large' }}
					height="calc(100vh - 150px)"
				>
					<ListRow>
						<Container
							padding={{ top: 'large' }}
							mainAlignment="flex-start"
							crossAlignment="flex-start"
						>
							<Switch label={t('backup.ldap_dump', 'LDAP Dump')} />
						</Container>
						<Container padding={{ top: 'large' }}>
							<Switch
								label={t('backup.include_server_configuration', 'Include server configuration')}
							/>
						</Container>
						<Container padding={{ top: 'large' }}>
							<Switch label={t('backup.purge_old_configuration', 'Purge old configuration')} />
						</Container>
						<Container padding={{ top: 'large' }}>
							<Switch label={t('backup.include_index', 'Include index')} />
						</Container>
					</ListRow>

					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							padding={{ top: 'large' }}
						>
							<Button
								type="outlined"
								label={t('backup.check_ldap', 'Check ldap')}
								color="primary"
								icon="ActivityOutline"
								iconPlacement="right"
								height={36}
								width="fit"
							/>
						</Container>
					</ListRow>

					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						padding={{ top: 'extralarge' }}
						height="fit"
					>
						<Text size="medium" weight="bold">
							{t('backup.tuning_options', 'Tuning Options')}
						</Text>
					</Container>

					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						padding={{ top: 'large' }}
						height="fit"
					>
						<Text size="medium" weight="bold">
							{t('backup.latency', 'Latency')}
						</Text>
					</Container>

					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="50%"
						>
							<Input
								label={t('backup.latency_high_threshold_ms', 'Latency High Threshold (ms)')}
								background="gray5"
								backgroundColor="gray5"
								borderColor="gray3"
							/>
						</Container>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="50%"
						>
							<Input
								label={t('backup.latency_low_threshold_ms', 'Latency Low Threshold (ms)')}
								background="gray5"
								backgroundColor="gray5"
								borderColor="gray3"
							/>
						</Container>
					</ListRow>

					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						padding={{ top: 'extralarge' }}
						height="fit"
					>
						<Text size="medium" weight="bold">
							{t('backup.waiting_time', 'Waititng Time')}
						</Text>
					</Container>

					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="100%"
						>
							<Input
								label={t('backup.max_waiting_time_ms', 'Max Waiting Time (ms)')}
								background="gray5"
								backgroundColor="gray5"
								borderColor="gray3"
							/>
						</Container>
					</ListRow>

					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						padding={{ top: 'extralarge' }}
						height="fit"
					>
						<Text size="medium" weight="bold">
							{t('backup.metadata', 'Metadata')}
						</Text>
					</Container>

					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="100%"
						>
							<Input
								label={t('backup.maximum_metadata_size_mb', 'Maximum Metadata Size (MB)')}
								background="gray5"
								backgroundColor="gray5"
								borderColor="gray3"
							/>
						</Container>
					</ListRow>

					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="100%"
						>
							<Switch label={t('backup.on_the_fly_metadata', 'On the fly metadata')} />
						</Container>
					</ListRow>

					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="100%"
						>
							<Switch label={t('backup.metadata_archiving', 'Metadata archiving')} />
						</Container>
					</ListRow>

					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						padding={{ top: 'extralarge' }}
						height="fit"
					>
						<Text size="medium" weight="bold">
							{t('backup.other_controls', 'Other Controls')}
						</Text>
					</Container>

					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="500%"
						>
							<Input
								label={t('backup.maximum_operation_per_account', 'Maximum Operation per Account')}
								background="gray5"
								backgroundColor="gray5"
								borderColor="gray3"
							/>
						</Container>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="500%"
						>
							<Input
								label={t('backup.compression_level', 'Compression Level')}
								background="gray5"
								backgroundColor="gray5"
								borderColor="gray3"
							/>
						</Container>
					</ListRow>

					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="500%"
						>
							<Input
								label={t('backup.thread_number_for_items', 'Thread number for items')}
								background="gray5"
								backgroundColor="gray5"
								borderColor="gray3"
							/>
						</Container>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'large', right: 'large' }}
							width="500%"
						>
							<Input
								label={t('backup.thread_number_for_accounts', 'Thread number for accounts')}
								background="gray5"
								backgroundColor="gray5"
								borderColor="gray3"
							/>
						</Container>
					</ListRow>
				</Container>
			</Container>
		</Container>
	);
};
export default ServerAdvanced;
