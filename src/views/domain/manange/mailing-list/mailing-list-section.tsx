/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
	Container,
	Text,
	Input,
	Row,
	Switch,
	Icon,
	Dropdown
} from '@zextras/carbonio-design-system';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';
import { MailingListContext } from './mailinglist-context';
import ListRow from '../../../list/list-row';
import { getDomainList } from '../../../../services/search-domain-service';

const MailingListSection: FC<any> = () => {
	const { t } = useTranslation();
	const context = useContext(MailingListContext);
	const [domainList, setDomainList] = useState([]);

	const { mailingListDetail, setMailingListDetail } = context;

	const changeResourceDetail = useCallback(
		(e) => {
			setMailingListDetail((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
		},
		[setMailingListDetail]
	);

	const getDomainLists = (domainName: string): any => {
		getDomainList(domainName)
			.then((response) => response.json())
			.then((data) => {
				const searchResponse: any = data?.Body?.SearchDirectoryResponse;
				if (!!searchResponse && searchResponse?.searchTotal > 0) {
					setDomainList(searchResponse?.domain);
				} else {
					setDomainList([]);
				}
			});
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const searchDomainCall = useCallback(
		debounce((domain) => {
			getDomainLists(domain);
		}, 700),
		[debounce]
	);

	useEffect(() => {
		if (mailingListDetail?.suffixName) {
			searchDomainCall(mailingListDetail?.suffixName);
		}
	}, [mailingListDetail?.suffixName, searchDomainCall]);

	const items = domainList.map((domain: any, index) => ({
		id: domain.id,
		label: domain.name,
		customComponent: (
			<Row
				top="9px"
				right="large"
				bottom="9px"
				left="large"
				style={{
					fontFamily: 'roboto',
					display: 'block',
					textAlign: 'left',
					height: 'inherit',
					padding: '3px',
					width: 'inherit'
				}}
				onClick={(): void => {
					setMailingListDetail((prev: any) => ({
						...prev,
						suffixName: domain?.name
					}));
				}}
			>
				{domain?.name}
			</Row>
		)
	}));

	return (
		<Container mainAlignment="flex-start">
			<Container
				mainAlignment="flex-start"
				crossAlignment="flex-start"
				height="calc(100vh - 300px)"
				background="white"
				style={{ overflow: 'auto', padding: '16px' }}
			>
				<Row>
					<Text
						size="small"
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						orientation="horizontal"
						weight="bold"
					>
						{t('label.mailing_list_name', 'Mailing List Name')}
					</Text>
				</Row>
				<ListRow>
					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						orientation="horizontal"
						padding={{ top: 'large' }}
					>
						<Input
							label={t('label.displayed_name', 'Displayed Name')}
							backgroundColor="gray5"
							value={mailingListDetail?.displayName}
							size="medium"
							inputName="displayName"
							onChange={changeResourceDetail}
						/>
					</Container>
				</ListRow>

				<ListRow>
					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						orientation="horizontal"
						padding={{ top: 'large', right: 'small' }}
					>
						<Input
							label={t('label.list_name_auto_fill', 'List Name (Auto-fill)')}
							backgroundColor="gray5"
							value={mailingListDetail?.prefixName}
							size="medium"
							inputName="prefixName"
							onChange={changeResourceDetail}
						/>
					</Container>
					<Container
						mainAlignment="flex-start"
						crossAlignment="center"
						orientation="horizontal"
						padding={{ top: 'large', right: 'small' }}
						width="fit"
					>
						<Icon icon="AtOutline" size="large" />
					</Container>
					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						orientation="horizontal"
						padding={{ top: 'large', left: 'small' }}
					>
						<Dropdown
							items={items}
							placement="bottom-start"
							maxWidth="300px"
							disableAutoFocus
							width="265px"
							style={{
								width: '100%'
							}}
						>
							<Input
								label={t('domain.type_here_a_domain', 'Type here a domain')}
								onChange={(ev: any): void => {
									setMailingListDetail((prev: any) => ({
										...prev,
										suffixName: ev.target.value
									}));
								}}
								value={mailingListDetail?.suffixName}
								backgroundColor="gray5"
							/>
						</Dropdown>
					</Container>
				</ListRow>
				<ListRow>
					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						orientation="horizontal"
						padding={{ top: 'medium', bottom: 'medium' }}
					>
						<Switch
							value={mailingListDetail?.dynamic}
							label={t('label.dynamic_mode', 'Dynamic Mode')}
							onClick={(): void => {
								setMailingListDetail((prev: any) => ({
									...prev,
									dynamic: !mailingListDetail?.dynamic
								}));
							}}
						/>
					</Container>
				</ListRow>
				{mailingListDetail?.dynamic && (
					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'small', bottom: 'medium' }}
						>
							<Input
								label={t('label.list_url', 'List URL')}
								backgroundColor="gray5"
								value={mailingListDetail?.memberURL}
								size="medium"
								inputName="memberURL"
								onChange={changeResourceDetail}
							/>
						</Container>
					</ListRow>
				)}
				<ListRow>
					<Container
						mainAlignment="flex-start"
						crossAlignment="flex-start"
						orientation="horizontal"
						padding={{ top: 'small', bottom: 'medium' }}
					>
						<Input
							label={t('label.notes', 'Notes')}
							backgroundColor="gray5"
							value={mailingListDetail?.zimbraNotes}
							size="medium"
							inputName="zimbraNotes"
							onChange={changeResourceDetail}
						/>
					</Container>
				</ListRow>

				{mailingListDetail?.dynamic && (
					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'medium', bottom: 'medium' }}
						>
							<Switch
								value={mailingListDetail?.zimbraHideInGal}
								label={t('label.hidden_from_gal', 'Hidden from GAL')}
								onClick={(): void => {
									setMailingListDetail((prev: any) => ({
										...prev,
										zimbraHideInGal: !mailingListDetail?.zimbraHideInGal
									}));
								}}
							/>
						</Container>
					</ListRow>
				)}

				{mailingListDetail?.dynamic && (
					<ListRow>
						<Container
							mainAlignment="flex-start"
							crossAlignment="flex-start"
							orientation="horizontal"
							padding={{ top: 'medium', bottom: 'medium' }}
						>
							<Switch
								value={mailingListDetail?.zimbraMailStatus}
								label={t('label.can_receive_email', 'Can receive email')}
								onClick={(): void => {
									setMailingListDetail((prev: any) => ({
										...prev,
										zimbraMailStatus: !mailingListDetail?.zimbraMailStatus
									}));
								}}
							/>
						</Container>
					</ListRow>
				)}
			</Container>
		</Container>
	);
};

export default MailingListSection;
