import { PgSsoClient } from "../client/pg.sso.client";

export class SSORepo {
    async getSSOMemberDetailsBySFMMDID(userId:string){
        const query = `
        select y.sfmm_id, y.dp_mem_contact_no, 
        concat(sdpi.sdpi_sfmm_first_name,' ', sdpi.sdpi_sfmm_middle_name, ' ', sdpi.sdpi_sfmm_last_name ) as dp_mem_full_name from (
        SELECT sdco_sfmm_id as sfmm_id, contact_no as dp_mem_contact_no
        FROM (
            SELECT sdci.sdco_sfmm_id, sdci.sdco_acco_contact AS contact_no FROM satsang_data_mgmt.satsang_devotee_contact_info sdci
            UNION 
            SELECT sdci.sdco_sfmm_id, sdci.sdco_online_phil_contact FROM satsang_data_mgmt.satsang_devotee_contact_info sdci
            UNION 
            SELECT sdci.sdco_sfmm_id, sdci.sdco_org_contact FROM satsang_data_mgmt.satsang_devotee_contact_info sdci
            UNION 
            SELECT sdci.sdco_sfmm_id, sdci.sdco_dp_contact FROM satsang_data_mgmt.satsang_devotee_contact_info sdci
            UNION 
            SELECT sdci.sdco_sfmm_id, sdci.sdco_primary_contact FROM satsang_data_mgmt.satsang_devotee_contact_info sdci
        ) x
        WHERE x.contact_no IS NOT NULL
        AND TRIM(x.contact_no ) <> ''
        GROUP BY sdco_sfmm_id,contact_no
        ) y
        inner join satsang_data_mgmt.satsang_devotee_profile_info sdpi 
        on y.sfmm_id = sdpi.sdpi_sfmm_id
        and y.sfmm_id = $1
        order by Random()
        limit 1
        `
        const result = await PgSsoClient.query(query,[userId])
        return {
            sfmmID: result.rows[0]?.sfmm_id,
            contactNumber: result.rows[0]?.dp_mem_contact_no,
            fullName: result.rows[0]?.dp_mem_full_name
        }

    }
}