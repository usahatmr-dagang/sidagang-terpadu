import pandas as pd
import sys

def check_data():
    pkl_file = "data pedagang PKL.xlsx"
    report_file = "REPORT_TRANSAKSI_UNIT PENGELOLA TAMAN MARGASATWA RAGUNAN_190726134107.xlsx"
    
    print("--- PKL DATA ---")
    try:
        df_pkl = pd.read_excel(pkl_file)
        # find rows where any string column contains siti chomsiyah (case insensitive)
        mask = df_pkl.apply(lambda col: col.astype(str).str.contains("siti chom", case=False, na=False)).any(axis=1)
        print(df_pkl[mask].to_dict('records'))
    except Exception as e:
        print(f"Error reading {pkl_file}: {e}")

    print("\n--- REPORT DATA ---")
    try:
        df_report = pd.read_excel(report_file)
        mask = df_report.apply(lambda col: col.astype(str).str.contains("siti chom", case=False, na=False)).any(axis=1)
        print(df_report[mask].to_dict('records'))
    except Exception as e:
        print(f"Error reading {report_file}: {e}")

if __name__ == '__main__':
    check_data()
