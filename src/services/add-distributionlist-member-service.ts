/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const removeDistributionListMember = async (dlId: string, dlm?: any[]): Promise<any> => {
	const request: any = {
		AddDistributionListMemberRequest: {
			_jsns: 'urn:zimbraAdmin',
			id: dlId,
			dlm
		}
	};

	return fetch(`/service/admin/soap/AddDistributionListMemberRequest`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			Body: request
		})
	});
};
