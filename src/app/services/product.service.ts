"use server";

import excuteQuery from "../utils/db/db";
import * as zm from "../models/models";
import { Session } from "next-auth";

export async function createProductDB(session: Session, data: zm.productSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createProduct(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
      values: [
        data.name,
        data.group,
        data.alias,
        data.unit,
        data.hsn_code,
        session.user.userId,
        data.profileDocument?.docId,
        data.c_col1,
        data.c_col2,
        data.c_col3,
        data.c_col4,
        data.c_col5,
        data.c_col6,
        data.c_col7,
        data.c_col8,
        data.c_col9,
        data.c_col10
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateProductDB(session: Session, data: zm.productSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateProduct(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
      values: [
        data.id,
        data.name,
        data.stamp,
        data.group,
        data.alias,
        data.unit,
        data.hsn_code,
        session.user.userId,
        data.profileDocument?.docId,
        data.c_col1,
        data.c_col2,
        data.c_col3,
        data.c_col4,
        data.c_col5,
        data.c_col6,
        data.c_col7,
        data.c_col8,
        data.c_col9,
        data.c_col10
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

/**
 *
 * @param crmDb database to search in
 * @param searchString partial string to search in product_master.name
 * @returns
 */
export async function getProductList(crmDb: string, searchString: string) {
  try {
    const search_value = searchString ? searchString : '';
    
    const result = await excuteQuery({
      host: crmDb,
      query: "call search_product(?);",
      values: [search_value]
    })
    return result[0]; 
  } catch (e) {
    console.log(e);
  }
}

export async function deleteProductListDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "call deleteProduct(?)",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getProductByPageDb(
  crmDb: string,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const vals: any = [page, limit, limit];

    if (filter) {
      vals.unshift(filter);
    }

    return excuteQuery({
      host: crmDb,
      query:
        "SELECT *,RowNum as RowID \
       FROM (Select im.*, gm.name as group_name, um.name as unit_name, ROW_NUMBER() OVER () AS RowNum\
       from product_master im left join product_group_master gm on im.group_id=gm.id \
       left join unit_master um on im.unit_id=um.id " +
        (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : "") +
        "order by im.name\
      ) AS NumberedRows\
      WHERE RowNum > ?*?\
      ORDER BY RowNum\
      LIMIT ?;",
      values: vals,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getProductCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from product_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 * @param crmDb database to search in
 * @param id id to search in product_master
 * @returns
 */
export async function fetchProductById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select im.*,im.unit_id as unit, im.group_id as `group`, gm.name as group_name, um.name as unit_name,\
        cfd.c_col1, cfd.c_col2, cfd.c_col3, cfd.c_col4, \
        cfd.c_col5, cfd.c_col6, cfd.c_col7, cfd.c_col8, cfd.c_col9, cfd.c_col10\
        from product_master im left join product_group_master gm on im.group_id=gm.id \
        left outer join custom_fields_data cfd on cfd.object_id = im.id and cfd.object_type_id=33\
        left join unit_master um on im.unit_id=um.id where im.id=?",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
