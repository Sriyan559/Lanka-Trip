<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model; use Illuminate\Database\Eloquent\SoftDeletes;
class EcosystemSectorPack extends Model {use SoftDeletes; protected $fillable=['uuid','slug','code','name','description','sector','industry','status','owner','risk_level','parent_pack_id','current_version_id','created_by','updated_by'];}
