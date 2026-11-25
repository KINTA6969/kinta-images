#!/usr/bin/env python3
"""Instagramのキャプションが長すぎないか確かめる。
予約投稿（Business Suite）は約2,200バイト（UTF-8）で後ろが切れて公開されるため、2,100バイト以下にする。
使い方: python3 tools/check_caps.py caps/c1124.json
"""
import json, sys

LIMIT = 2100
ok = True
for path in sys.argv[1:]:
    d = json.load(open(path))
    for k, v in d.items():
        ig = v.get('ig', '') if isinstance(v, dict) else ''
        b = len(ig.encode('utf-8'))
        mark = 'OK' if b <= LIMIT else 'NG（長すぎ）'
        if b > LIMIT:
            ok = False
        print(f'{path} {k}: {len(ig)}文字 {b}バイト {mark}')
sys.exit(0 if ok else 1)
