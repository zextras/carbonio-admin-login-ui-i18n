/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { FC, useState } from 'react';
import {
	Container,
	Input,
	Row,
	IconButton,
	Button,
	Divider,
	Padding,
	Icon,
	Text,
	Switch
} from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';

const ServerVolumeDetailsPanel: FC<{ setToggleDetailPage: any; volumeDetail: any }> = ({
	setToggleDetailPage,
	volumeDetail
}) => {
	const { t } = useTranslation();
	const [compression, setCompression] = useState(true);

	return (
		<>
			{volumeDetail && (
				<Container background="gray6">
					<Row mainAlignment="flex-start" crossAlignment="center" width="100%" height="auto">
						<Row mainAlignment="flex-start" padding={{ all: 'large' }} takeAvailableSpace>
							<Text size="extralarge" weight="bold">
								{volumeDetail.item1} Details
							</Text>
						</Row>
						<Row padding={{ horizontal: 'small' }}>
							<IconButton
								icon="CloseOutline"
								color="gray1"
								onClick={(): void => setToggleDetailPage(false)}
							/>
						</Row>
					</Row>
					<Divider />
					<Container
						padding={{ horizontal: 'large', top: 'extralarge', bottom: 'large' }}
						mainAlignment="flex-start"
						crossAlignment="flex-start"
					>
						<Row padding={{ top: 'small' }} width="100%">
							<Input
								label={t('label.volume_name', 'Volume Name')}
								value={volumeDetail.item1}
								backgroundColor="gray5"
								readyOnly
							/>
						</Row>
						<Row padding={{ top: 'large' }} width="100%">
							<Row width="48%" mainAlignment="flex-start">
								<Input
									label={t('label.allocation', 'Allocation')}
									CustomIcon={(): unknown => (
										<Icon icon="ChevronDownOutline" size="large" color="gray0" />
									)}
									value="Local"
									backgroundColor="gray5"
									readOnly
								/>
							</Row>
							<Padding width="4%" />
							<Row width="48%" mainAlignment="flex-end">
								<Input
									label={t('label.type', 'Type')}
									backgroundColor="gray6"
									value="Secondary"
									readOnly
								/>
							</Row>
						</Row>
						<Row padding={{ top: 'large' }} width="100%">
							<Input
								label={t('label.volume_id', 'Volume ID')}
								value="1b26f772-301f-448b-9dd9-2dc75a0d326d"
								backgroundColor="gray6"
								readyOnly
							/>
						</Row>
						<Row padding={{ top: 'large' }} width="100%">
							<Input
								label={t('label.path', 'Path')}
								value="/opt/.../store"
								backgroundColor="gray5"
								readyOnly
							/>
						</Row>
						<Row padding={{ top: 'large' }} width="100%">
							<Input
								label={t('label.creation_date', 'Creation Date')}
								value="2021/12/14   |   4:29PM"
								backgroundColor="gray6"
								readyOnly
							/>
						</Row>
						<Row mainAlignment="flex-start" padding={{ top: 'large' }} width="100%">
							<Row width="48%" mainAlignment="flex-start">
								<Switch
									value={compression}
									onClick={(): unknown => setCompression(!compression)}
									label={t('label.enable_compression', 'Enable Compression')}
								/>
							</Row>
							<Padding width="4%" />
							<Row width="48%" mainAlignment="flex-start">
								<Switch
									value={compression}
									onClick={(): unknown => setCompression(!compression)}
									label={t('label.current', 'Current')}
								/>
							</Row>
						</Row>
						<Row padding={{ top: 'small' }} width="50%">
							<Input
								label={t('label.compression_threshold', 'Compression Threshold')}
								value="-"
								backgroundColor="gray6"
								readOnly
								color="secondary"
							/>
						</Row>
						<Container orientation="horizontal" mainAlignment="flex-end" crossAlignment="flex-end">
							<Button
								icon="CloseOutline"
								iconPlacement="left"
								type="outlined"
								label={t('label.button_delete', 'DELETE')}
								color="error"
								width="fill"
							/>
						</Container>
					</Container>
				</Container>
			)}
		</>
	);
};

export default ServerVolumeDetailsPanel;
