import { PgSsoClient } from "../client/pg.sso.client";

export class RegistrationRepo {

  async getUnregisteredMember(){
    const result = await PgSsoClient.query(
      `
        select y.sfmm_id, y.contact_no, 
        concat(sdpi.sdpi_sfmm_first_name,' ', sdpi.sdpi_sfmm_middle_name, ' ', sdpi.sdpi_sfmm_last_name ) as full_name from (
        SELECT sdco_sfmm_id as sfmm_id, contact_no
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
        order by Random()
        limit 1
      `)
    return {
      sfmmId: result?.rows[0]?.sfmm_id,
      contactNumber: result?.rows[0]?.contact_no,
      fullName: result?.rows[0]?.full_name
    }
  }
  

  async getLatestOTP(contactNo: string) {
    const res = await PgSsoClient.query(
      `SELECT otp FROM otp_requests WHERE contact_no = $1 ORDER BY created_at DESC LIMIT 1`,
      [contactNo]
    );
    return res.rows[0]?.otp;
  }
}

