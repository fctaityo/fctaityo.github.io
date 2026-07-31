# Public Configuration Audit

本ディレクトリは、Local AI Foundryで確定した内部Configuration Auditを基に作成した公開版を保存する。

## 公開版の原則

- 内部AuditのAudit ID、Scope、Final Result、主要なBlocking判定を維持する。
- App ID、Workflow ID、Draft ID、Run ID、Commit SHA、内部path、Database情報、認証・接続情報、hashなど、公開に不要な運用識別情報は削除または一般化する。
- 公開版の作成によって、内部Auditの判定やEvidenceを変更しない。
- 公開版は新しいAuditではなく、内部Auditの公開用表現である。
- 内部Auditと異なる内容へ同じAudit IDを割り当てない。
- 公開版を追加・更新する場合は、同じ変更で`index.md`を同期し、相対リンクを確認する。

内部Auditのすべてを機械的に公開する必要はない。
